# Task Manager App

## Project Goals

I want to create a task management APP. USERS Can Share tasks with other users.
Feature List:
-BASIC 
    -CREATE A TASK THAT CANDLE EDITED AND Deleted. 
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
    - On the landing page, new users will see this nav bar. allowing them to access the contact page, booking or sign in/sign up.
    ![Nav bar for signed out users](media/images/navbarnotsignedin.PNG)

    - When a regular customer signs in they will see this version of the nav bar, the user option will give them a drop down menu that allows them to access the user panel or logout.
    ![Nav bar for signed in customers](media/images/navbarnotstaff.PNG)

    - The full landing page and nav bar that staff members will see is shown below. The booking button will take users to the online booking feature.
    ![Landing Page for signed in staff](media/images/index.PNG)

    - The code that changes this view is in the layout.html template:
```                     
                        {% if user.is_authenticated %}
                        {% if user.is_staff %}
                        <!--Staff Link-->
                        <li class="nav-item">
                            <a class="nav-link active cHover" href="{% url 'staffPanel' %}">Staff Panel</a>
                        </li>
                        {% endif %}
                        <li class="nav-item dropdown me-3 fs-5">
                            <a class="nav-link active dropdown-toggle cHover" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                User
                            </a>
                            <ul class="dropdown-menu  border zNav" style="background-color: #F0E6EF;">
                                <li><a class="dropdown-item" href="{% url 'userPanel' %}">User Panel</a></li>
                                <li>
                                    <hr class="">
                                </li>
                                <li><a class="dropdown-item" href="{% url 'logout' %}?next=/">Sign Out</a></li>
                            </ul>
                        </li>
                        {% else %}
                        <li class="nav-item me-3">
                            <a class="nav-link active cHover" href="{% url 'register' %}">Sign in/Sign Up</a>
                        </li>
                        {% endif %}

```

- Register user
    - Users can create a user profile and then use the username and password they choose here to log-in.
    ![Screenshot of sign up page](media/images/signup.PNG)

    - User accounts have to be verified on the administration page to become staff accounts. This is fine for a small business as one superuser controlling who is staff is fine but for a larger salon there would need to be different staff account with different permissions. Code for admin action:

```
class UserAdmin(OriginalUserAdmin):
    list_display = ('first_name', 'last_name', 'email', 'is_staff')
    list_filter = ('is_staff', 'first_name')
    search_fields = ('first_name', 'last_name', 'username', 'email')
    actions = ['hired', 'fired']

    def hired(self, request, queryset):
        queryset.update(is_staff=True)

    def fired(self, request, queryset):
        queryset.update(is_staff=False)
```

- Sign In User
    - Users can enter in their details to sign in here and access their user panel which shows their appointments.
    ![Screenshot of sign in page](media/images/signin.PNG)

- Booking Pages
    - A signed in user can access these pages and choose a service and date for an appointment.
    ![Screenshot of booking date and service page](media/images/bookdate.PNG)

    - After selecting a time and service the user can choose a time for their appointment. They cannot book a time that has already been selected. In this example there is already a booking for 11:00.
    ![Screenshot of booking time page](media/images/booktime.PNG)
    ![Screenshot of booking selected time page](media/images/timeslottaken.PNG)

    - Users are redirected to the landing page after booking and recieve a confirmation message of their booking.
    ![Screenshot of booking confirmation message page](media/images/bookmessage.PNG)

- User Panel
    - On the user panel users can see their appointments and click on buttons to edit them or delete them.
    ![Screenshot of User panel with edit and delete buttons](media/images/deleteappointments.PNG)
    
- User Update Pages
    - The user can edit the details of their already booked appointments here. Very similar to the booking pages
    ![Screenshot of editing booking date and service page](media/images/editdate.PNG)
    ![Screenshot of editing booking time page](media/images/edittime.PNG)

- Staff Panel
    - Users who have been authorised as staff can view this page and see appointments made by other users, organised by soonest appointment first.
    ![Screenshot of Staff Panel page](media/images/staffpanel.PNG)

- Contact Form
    - Users can submit a message along with their name and contact details in order to ask a question to the salon, this is saved on the backend.
    ![Screenshot of contact us page](media/images/contactus.PNG)

### Future Features

- Staff CRUD
    - A useful feature for future implementation would be allowing staff members to edit and delete appointments form the staff panel

- Multiple calenders
    - If the salon had multiple technicians then the appointment calender would need to be changed so that each technician had their own calenders that customers could select from

- E-mail Reminders
    - A useful feature to implement would be to have an automated email be sent to customers reminding them of their appointment.

## Data Model

- The website is made up of two apps. The authentication app handles user registration and sign-in/out. The book app handles the creation and management of appointments.

### Authentication

- This authenitication uses the default django user model.
- There is one form in this app which allows users to fill in the fields for the user model.
- There are three views associated with the authenitication app:
    - login_user takes the post from login.html and authenticates the username and password submited.
    if the user exists then the user is redirected to their user-panel, otherwise they are redirected back to the login page.
    - logout_user calls the logout function and redirects the user to the landing page.
    - register_user takes the post from RegisterUserForm form and checks if the form is valid then if successful it also calls the log in user function and redirects the user to the landing page

### Booking

- The booking app contains two models:
    - The contact model has three fields which users fill out manually: name, email, and message.
    - The Appointment model has five fields. user is assigned from the user who creates an appointment, if the user gets deleted then associated appointments are also deleted. service is selected by the user in the booking.html, as is the date. time is selected on the bookingSubmit.html. time_ordered creates a timestamp for when the appointment was made and is for administrative purposes only.
- There are fourteen views in the booking app:
    - The index function generates the front page.
    - The Contact view takes the user's input data from contact.html and saves it in the backend.
    - checkTime creates a list of times that have been selected for appointments on a given day and if there are no appointments for a timeslot it is selectable.
    - checkEditTime does almost the same function but also shows the time previously chosen for that appointment in case the user wants to keep that time.
    - dayToWeekday takes a date and converts in into a weekday eg. monday,...
    - validweekday takes a number of days and loops through that number starting from the current date, it then adds them to a list if they match the criteria, in this case thats being a Monday, Wednesday, or Friday.
    - isWeekdayValid calls that list made before and creates another only showing days that have availability.
    - the booking function calls the previous functions to create a list of day choices for the user and displays a list of services. It validates that the user has selected a service and then if successful returns this data for use in the next model.
    - The booking submit function calls the checktime function to get a list of valid timeslots available. It then validates that the model has a service, is booked sometime between yesterday and 21 days from date of booking, is a valid weekday, that their are available times on that day, that the time selected is available. If these all pass then the appointment model is created with these fields selected in the booking process. 
    - userUpdate and userUpdateSubmit are functionally very similair to the above two but call a specific appointment's data up to be edited.
    - deleteAppointment calls the appointment id and deletes that appointment.
    - userPanel organises appointments made by that user by time and date.
    - staffPanel oranganises all appointments made for the next 21 days by time and date.

## Development

- This project was developed with an agile development methodology. 
    - An epic was created to outline the goal of the project
        - "I want to create a website that customers can use to book appointments at a salon. I want them to be able to select a service and available times for an appointment, the customer will need to create an account so that they can view and edit their appointments. I want the technicians to have an account where they are able to view their appointments. When either a customer or technician deletes an appointment I want the time slot to become available again and an email sent to both parties confirming the cancellation. I want an email sent to the client 5 days prior to their appointment or straight away if the appointment made is within 5 days asking them to confirm the appointment. Technicians should be able to send a reminder manually as well if the client doesn’t confirm.
        - During development some off these features didn't end up being developed due to time constraint and developer knowledge but the minimum viable product was developed.

    - User stories were created and tracked using GitHub's projects functionality:
    ![Screenshot of github projects page with user stories](media/images/userstories.jpg)

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

- The site was deployed using Code Institute's mock terminal for Heorku. The steps to deploy are as follows
    - Create a new Heroku App
    - Set the buildbacks to Python and NodeJS in that order
    - Link the heroku app to a PostgreSQL database hosted on https://www.elephantsql.com
    - Link the heroku app to the repository
    - Click on Deploy

## Credits

- To complete this project I used Code Institute student template: [gitpod full template](https://github.com/Code-Institute-Org/python-essentials-template)

- Bootstrap framework was used to help write the html and css in the templates.

### Code

- Tutorials I followed to create the basis of this code are as follows:
    -https://www.thetechplatform.com/post/develop-an-hotel-management-system-with-django
- https://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiMw-7868r7AhVjxDgGHUkHC98QwqsBegQIChAF&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DrHZwE1AK1h8&usg=AOvVaw3cyttpzMTyD7QJFg-lzosP
- https://blog.devgenius.io/django-tutorial-on-how-to-create-a-booking-system-for-a-health-clinic-9b1920fc2b78

