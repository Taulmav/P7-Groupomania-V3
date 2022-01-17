import icon from '../../imgs/logo/icon.png';

const Login = ({onLogin}) => {
    return ( 
            <>
            <div class="max-w-md w-full space-y-8">
                <div>
                  <img class="mx-auto h-40 w-auto" src={icon} alt="Groupomania"/>
                  <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Se connecter
                  </h2>
                </div>
                <div class="mt-8 space-y-6">
                  <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label for="userName" class="sr-only">Password</label>
                      <input id="userName" name="userName" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4" placeholder="Nom de compte"/>
                    </div>
                    <div>
                      <label for="password" class="sr-only">Password</label>
                      <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4" placeholder="Password"/>
                    </div>
                  </div>
                  <div>
                    <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                    text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(e) => {
                        e.preventDefault();
                        const userName = document.getElementById('userName').value;
                        const password = document.getElementById('password').value;
                        console.log(userName, password)
                        onLogin(userName, password)
                    }}>
                      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      Sign in
                    </button>
                  </div>
                </div>
            </div>        
            </>
         );
    }
 
export default Login;

