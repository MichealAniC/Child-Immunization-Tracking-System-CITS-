const { DateTime } = require('luxon');

// Immunization schedule utility functions
const immunizationUtils = {
  // Calculate vaccine due date based on child's DOB and recommended age
  calculateDueDate: (dateOfBirth, recommendedAge) => {
    try {
      const dob = DateTime.fromISO(dateOfBirth);
      
      if (!dob.isValid) {
        throw new Error('Invalid date of birth');
      }
      
      // Parse recommended age string (e.g., 'At birth', '6 weeks', '10 weeks', '6 months')
      const ageParts = recommendedAge.trim().toLowerCase().split(' ');
      
      if (ageParts[0] === 'at' && ageParts[1] === 'birth') {
        return dob.toISODate(); // Same as DOB
      }
      
      // Handle numeric age recommendations
      const number = parseInt(ageParts[0]);
      if (isNaN(number)) {
        throw new Error(`Invalid number in recommended age: ${recommendedAge}`);
      }
      
      const unit = ageParts[1];
      
      switch (unit) {
        case 'days':
        case 'day':
          return dob.plus({ days: number }).toISODate();
        case 'weeks':
        case 'week':
          return dob.plus({ weeks: number }).toISODate();
        case 'months':
        case 'month':
          return dob.plus({ months: number }).toISODate();
        case 'years':
        case 'year':
          return dob.plus({ years: number }).toISODate();
        default:
          throw new Error(`Unsupported time unit: ${unit}`);
      }
    } catch (err) {
      console.error('Error calculating due date:', err);
      throw err;
    }
  },

  // Calculate vaccine status based on current date and due date
  calculateVaccineStatus: (dueDate, dateAdministered) => {
    try {
      const today = DateTime.now().startOf('day');
      const due = DateTime.fromISO(dueDate).startOf('day');
      
      if (!due.isValid) {
        throw new Error('Invalid due date');
      }
      
      if (dateAdministered) {
        const administered = DateTime.fromISO(dateAdministered).startOf('day');
        if (administered.isValid) {
          return 'completed';
        }
      }
      
      // Compare dates
      if (today < due) {
        // Upcoming - within 7 days
        const daysUntilDue = due.diff(today, 'days').days;
        if (daysUntilDue <= 7 && daysUntilDue > 0) {
          return 'upcoming';
        }
        return 'pending';
      } else if (today.equals(due)) {
        return 'pending';
      } else {
        // Due date has passed
        return 'missed';
      }
    } catch (err) {
      console.error('Error calculating vaccine status:', err);
      throw err;
    }
  },

  // Generate complete vaccination schedule for a child
  generateVaccinationSchedule: (dateOfBirth, vaccines) => {
    try {
      const schedule = [];
      
      vaccines.forEach(vaccine => {
        try {
          const dueDate = immunizationUtils.calculateDueDate(dateOfBirth, vaccine.recommended_age);
          const status = immunizationUtils.calculateVaccineStatus(dueDate);
          
          schedule.push({
            vaccine_id: vaccine.id,
            vaccine_name: vaccine.vaccine_name,
            recommended_age: vaccine.recommended_age,
            due_date: dueDate,
            status: status,
            description: vaccine.description
          });
        } catch (err) {
          console.warn(`Could not calculate schedule for vaccine ${vaccine.vaccine_name}:`, err.message);
        }
      });
      
      return schedule;
    } catch (err) {
      console.error('Error generating vaccination schedule:', err);
      throw err;
    }
  }
};

module.exports = immunizationUtils;