# Task Manager App

## Project Goals

I want to create a task management APP. USERS Can Share tasks with other users.
Feature List:
-BASIC 
    -CREATE A TASK THAT CAN be EDITED AND Deleted. 
    Set task Deadline,
-Additional features
    -Set task from SET-→ in Progress → done 
    -Allow different roles in tasks 
    -Group Users as "project" and set multiple tasks
    -Assign tasks to people 
    -When task updated, group informed

The live link can be found here - https://task-todo-frontend.herokuapp.com


## Features

### Existing Features

- Landing Page

- Create Task

- List Tasks
    

- Create Groups
  
- Groups List
   
- ProfilePage
 
### Future Features


## Data Model

### Profiles

- 

### Tasks

- AddToDo component
    - 

- ToDo List component
    - 

### Groups
- CreateToDo component
    - 

- GroupList component

### Asset
- 

## React

- Overview of React Architecture
    - React is a JavaScript library for building user interfaces. Its architecture is based on a set of key concepts, including components, props, and state.

    Components are the building blocks of React applications. They are reusable pieces of UI that can be composed to create complex user interfaces. Components can be functional or class-based, and they can be customized with props and state.

    Props, short for properties, are a way to pass data from one component to another. They are immutable, meaning that they cannot be changed once they are set. Props are used to customize the behavior or appearance of components and can be accessed as properties of the component's props object.

    State is a way to manage data within a component. Unlike props, state can be changed during the lifetime of a component, and any changes to state will trigger a re-render of the component. State is used to manage user input, control component behavior, or reflect changes in the application's data.

    React applications are typically organized into a tree-like hierarchy of components. Each component is responsible for rendering a specific part of the UI and can contain other components as children. The component hierarchy can be represented as a virtual DOM, which is a lightweight copy of the actual DOM that React uses to update the UI efficiently.

    React's architecture emphasizes modularity, reusability, and declarative programming. By breaking the UI into smaller, reusable components and managing data through props and state, React enables developers to build complex user interfaces that are easier to maintain and scale.

- Advantages of using React
    - Reusing components in a React application offers a number of benefits, including:

        1. Improving code organization: By breaking the UI into smaller, reusable components, developers can more easily organize and structure their code. Components can be developed and tested in isolation, making it easier to maintain and update the codebase over time.

        2. Reducing duplication: Reusing components can help reduce code duplication, as developers can write a single component that can be used in multiple parts of the application. This reduces the amount of code that needs to be written, tested, and maintained, resulting in a more efficient and streamlined codebase.

        3. Promoting consistency in the user interface: Reusing components can help ensure a consistent user interface across the application. By using the same components with consistent behavior and styling, developers can ensure that the user experience is consistent and predictable, reducing confusion and improving usability.

        4. Enhancing scalability: Reusing components can help make an application more scalable, as developers can add new functionality or features by composing existing components rather than writing new code from scratch. This can help reduce the time and cost of development, as well as improve the maintainability of the codebase.

        5. Facilitating collaboration: Reusing components can help facilitate collaboration among developers, as they can share components and work together to develop and improve them. This can help improve code quality, reduce errors, and accelerate development timelines.

        - Overall, reusing components in a React application can help improve code quality, reduce development time and costs, and enhance the user experience. By leveraging the modularity and reusability of React components, developers can build more efficient, maintainable, and scalable applications.

- Disadvantages of using React
    - 

### UX Design

- Early layout designs
    - This is the layout of the landing page which shows How I wanted this page to look. 
    ![Landing page design](media/images/Landing%20Page.png)
    - With the task page layout I knew I would have to have a component for creating and displaying Todos.
    ![Task page design](media/images/Task%20page.png)
    - With the profile Page design I knew I wanted the Todo's to be listed here again so I would reuse that component. I also needed to create components for group creation and viewing.
    ![Profile page design](media/images/profile.png)
## Testing

### Validator Testing

- Html
    - Using w3 validator templates were passing ignoring Django html template syntax
    - https://validator.w3.org/nu/

- Python
    - Passed pycodestyle formatting

### Compatibility Testing

Site was tested across multiple virtual devices through chrome developor tools.

Site was tested to work on Google chrome, firefox, microsoft edge and internet explorer.

### Manual Testing

#### Booking

```

class BookUrlTests(TestCase):

    def test_get_home(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        response2 = self.client.get(reverse('index'))
        self.assertEqual(response2.status_code, 200)
        self.assertTemplateUsed(response, 'index.html', 'layout.html')

    def test_get_contact_us(self):
        response = self.client.get('/contact-us')
        self.assertEqual(response.status_code, 200)
        response2 = self.client.get(reverse('contact-us'))
        self.assertEqual(response2.status_code, 200)
        self.assertTemplateUsed(response, 'contact.html', 'layout.html')

    def test_get_booking(self):
        response = self.client.get('/booking')
        self.assertEqual(response.status_code, 200)
        response2 = self.client.get(reverse('booking'))
        self.assertEqual(response2.status_code, 200)
        self.assertTemplateUsed(response, 'booking.html', 'layout.html')

    def test_get_booking_submit(self):
        response = self.client.get('/booking-submit')
        self.assertEqual(response.status_code, 200)
        response2 = self.client.get(reverse('bookingSubmit'))
        self.assertEqual(response2.status_code, 200)
        self.assertTemplateUsed(response, 'bookingSubmit.html', 'layout.html')

    def test_get_staff_panel(self):
        response = self.client.get('/staff-panel')
        self.assertEqual(response.status_code, 200)
        response2 = self.client.get(reverse('staffPanel'))
        self.assertEqual(response2.status_code, 200)
        self.assertTemplateUsed(response, 'staffPanel.html', 'layout.html')

    #login required pages
    def test_get_user_panel(self):
        test_user = User.objects.create_user(username='testuser', password='AGoodPassword')
        login = self.client.login(username='testuser', password='AGoodPassword')
        response = self.client.get('/user-panel')
        self.assertEqual(str(response.context['user']), 'testuser')
        self.assertEqual(response.status_code, 200)
        response2 = self.client.get(reverse('userPanel'))
        self.assertEqual(response2.status_code, 200)
        self.assertTemplateUsed(response, 'userPanel.html', 'layout.html')

```

#### Authentication

```
class TestRegisterUserForm(TestCase):

    def setUp(self) -> None:
        self.username = 'testuser'
        self.first_name = 'test'
        self.last_name = 'user'
        self.email = 'testuser@email.com'
        self.password = 'AGoodPassword'

    def test_registration_form(self):
        invalid_data_dicts = [
            # Non-alphanumeric username.
            {
              'data':
              {'username': 'foo/bar',
               'email': 'tests@example.com',
               'password1': '12345678',
               'password2': '12345678'},
            },
            # Non-valid email.
            {
              'data':
              {'username': 'user',
               'email': 'notanemail',
               'first_name': 'user',
               'last_name': 'test',
               'password1': 'AGoodPassword',
               'password2': 'AGoodPassword', },
            },
            # Empty username.
            {
              'data':
              {'username': '',
               'email': 'tests@example.com',
               'first_name': 'user',
               'last_name': 'test',
               'password1': 'AGoodPassword',
               'password2': 'AGoodPassword', },
            },
            # Empty first name.
            {
              'data':
              {'username': 'user',
               'email': 'tests@example.com',
               'first_name': '',
               'last_name': 'test',
               'password1': 'AGoodPassword',
               'password2': 'AGoodPassword', },
            },
            # Empty last name.
            {
              'data':
              {'username': 'user',
               'email': 'tests@example.com',
               'first_name': 'user',
               'last_name': '',
               'password1': 'AGoodPassword',
               'password2': 'AGoodPassword', },
            },
            # Bad Password.
            {
              'data':
              {'username': 'user',
               'email': 'tests@example.com',
               'first_name': 'user',
               'last_name': 'test',
               'password1': 'Password',
               'password2': 'Password', },
            },
            # Empty email.
            {
              'data':
              {'username': 'user',
               'email': '',
               'first_name': 'user',
               'last_name': 'test',
               'password1': 'AGoodPassword',
               'password2': 'AGoodPassword', },
            },
            # passwords not-matching.
            {
              'data':
              {'username': 'user',
               'email': 'tests@example.com',
               'first_name': 'user',
               'last_name': 'test',
               'password1': 'AGoodPassword',
               'password2': 'ABadPassword', },
            },
        ]

        for invalid_dict in invalid_data_dicts:
            form = forms.RegisterUserForm(data=invalid_dict['data'])
            self.failIf(form.is_valid())

        form = forms.RegisterUserForm(data={'username': 'user',
                                            'email': 'tests@example.com',
                                            'first_name': 'user',
                                            'last_name': 'test',
                                            'password1': 'AGoodPassword',
                                            'password2': 'AGoodPassword', })
        self.assertTrue(form.is_valid())
    
class LogInTest(TestCase):
    
  def test_get_home(self):
    response = self.client.get('/')
    self.assertEqual(response.status_code, 200)
    self.assertTemplateUsed(response, 'index.html', 'layout.html')

  def test_get_login(self):
    response = self.client.get('/user/login_user')
    self.assertEqual(response.status_code, 200)
    self.assertTemplateUsed(response, 'registration/login.html', 'layout.html')

  def test_get_registration(self):
    response = self.client.get('/user/register_user')
    self.assertEqual(response.status_code, 200)
    self.assertTemplateUsed(response, 'register_user.html', 'layout.html')

```

## Deployment

- The site was deployed on Heorku. The steps to deploy are as follows
    - Create a new Heroku App
    - Link the heroku app to the repository
    - Click on Deploy

- This frontend APP connects to a backend API. The steps to connect the two are as follows
    - In the DRF settings, add code to allow different hosts depending on whether the backend is in development mode or not:
    ```
    if 'CLIENT_ORIGIN' in os.environ:
    CORS_ALLOWED_ORIGINS = [
        os.environ.get('CLIENT_ORIGIN')
    ]

    if 'CLIENT_ORIGIN_DEV' in os.environ:
    extracted_url = re.match(
        r'^.+-', os.environ.get('CLIENT_ORIGIN_DEV', ''), re.IGNORECASE
    ).group(0)
    CORS_ALLOWED_ORIGIN_REGEXES = [
        rf"{extracted_url}(eu|us)\d+\w\.gitpod\.io$",
    ]
    ```
    - Both of these code snippets get URLs that are in the config vars on Heroku for the deployed backend.
    - When making Https requests to the backend use Axios and link to the deployed backend: https://task-backend.herokuapp.com/ .

## Credits

- Bootstrap framework was used to help write the html and css in the templates.

- images:
    - 

### Code

- Tutorials I followed to create the basis of this code are as follows:
    -https://www.youtube.com/watch?v=W9BjUoot2Eo 

