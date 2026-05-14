import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-blue-600 text-white p-4 shadow-md">
            <h1 className="text-2xl font-bold">Child Immunization Tracking System</h1>
            <p className="text-blue-100">CITS - Track and manage child vaccination records</p>
          </header>
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/children" element={<ChildrenList />} />
              <Route path="/children/:id" element={<ChildProfile />} />
              <Route path="/children/:id/schedule" element={<VaccinationSchedule />} />
              <Route path="/children/:id/immunizations" element={<ImmunizationRecords />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-800 text-white p-4 mt-12">
            <p className="text-center">© 2026 Child Immunization Tracking System. All rights reserved.</p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Placeholder components
function Home() {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold mb-4">Welcome to CITS</h2>
      <p className="text-lg mb-6">A digital platform for tracking and managing child vaccination records</p>
      <div className="flex justify-center space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">Login</button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">Register</button>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to CITS</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="/register" className="text-blue-600 hover:text-blue-800">Don't have an account? Register</a>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
          <select 
            id="role" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="parent">Parent/Guardian</option>
            <option value="admin">Healthcare Worker</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="/login" className="text-blue-600 hover:text-blue-800">Already have an account? Login</a>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Children</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Upcoming Vaccinations</h3>
          <p className="text-3xl font-bold text-orange-500">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Completed Vaccinations</h3>
          <p className="text-3xl font-bold text-green-600">47</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>John Smith registered child Sarah Smith</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Dr. Johnson recorded OPV vaccine for Michael Brown</span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Emma Davis viewed vaccination schedule for Lily Davis</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChildrenList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Children</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          + Add Child
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JS</div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Sarah Smith</div>
                    <div className="text-sm text-gray-500">Parent: John Smith</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Female</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Up to date</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900">Edit</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">MB</div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Michael Brown</div>
                    <div className="text-sm text-gray-500">Parent: Mary Brown</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 22, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Male</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Due soon</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChildProfile() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sarah Smith</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Edit</button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">Delete</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="space-y-2">
            <p><strong>Date of Birth:</strong> Jan 15, 2025</p>
            <p><strong>Gender:</strong> Female</p>
            <p><strong>Parent:</strong> John Smith (john@example.com)</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Vaccination Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>BCG</span>
              <span className="text-green-600 font-medium">Completed</span>
            </div>
            <div className="flex justify-between">
              <span>OPV 1</span>
              <span className="text-orange-600 font-medium">Due in 3 days</span>
            </div>
            <div className="flex justify-between">
              <span>Pentavalent 1</span>
              <span className="text-orange-600 font-medium">Due in 3 days</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Next Appointment</h3>
          <div className="space-y-2">
            <p><strong>Date:</strong> June 15, 2025</p>
            <p><strong>Vaccines:</strong> OPV 1, Pentavalent 1</p>
            <p><strong>Location:</strong> City Health Center</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Vaccination History</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <h4 className="font-medium">BCG</h4>
              <p className="text-sm text-gray-500">Administered on Jan 15, 2025</p>
            </div>
            <span className="text-green-600 font-medium">Completed</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <h4 className="font-medium">Hepatitis B</h4>
              <p className="text-sm text-gray-500">Administered on Jan 15, 2025</p>
            </div>
            <span className="text-green-600 font-medium">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VaccinationSchedule() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vaccination Schedule</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Record Vaccination
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccine</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Age</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">BCG</div>
                <div className="text-sm text-gray-500">Tuberculosis</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">At birth</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900">Record</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">OPV 1</div>
                <div className="text-sm text-gray-500">Oral Polio Vaccine</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6 weeks</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Feb 26, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Due soon</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900">Record</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">Pentavalent 1</div>
                <div className="text-sm text-gray-500">DPT + HepB + Hib</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6 weeks</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Feb 26, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Due soon</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900">Record</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">OPV 2</div>
                <div className="text-sm text-gray-500">Oral Polio Vaccine</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 weeks</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 26, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900">Record</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ImmunizationRecords() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Immunization Records</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          + Add Record
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccine</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Administered</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administered By</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">BCG</div>
                <div className="text-sm text-gray-500">Tuberculosis</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Johnson</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">Hepatitis B</div>
                <div className="text-sm text-gray-500">Hepatitis B</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Johnson</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;