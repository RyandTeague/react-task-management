# Task Manager App

## Project Goals

I want to create a task management app. Users Can Share tasks with other users.
Feature List:
- BASIC 
    - Functional app that allows users to create accounts and log in (User stories 1-8, 14,15, )
    - Create a task that can be edited and Deleted. (User stories 9, 10)
    - Set task Deadline, (User stories 11, 16, 17 )
- Additional features
    - Allow Users to befriend each other (User stories 12,13)
    - Allow different roles in tasks 
    - Group Users as "project" and set multiple tasks (User stories 19, 20)
    - Assign tasks to people (User stories 18)
    - When task updated, group informed

The live link can be found here - https://task-todo-frontend.herokuapp.com

## User Stories

1. As a user I can view a navbar from every page so that I can navigate easily between pages
2. As a user I can navigate through pages quickly so that I can view content seamlessly without page refresh
3. As a user I can create a new account so that I can access all the features for signed up users
4. As a user I can sign in to the app so that I can access functionality for logged in users
5. As a user I can tell if I am logged in or not so that I can log in if I need to
6. As a user I can maintain my logged-in status until I choose to log out so that my user experience is not compromised
7. As a logged out user I can see sign in and sign up options so that I can sign in/sign up
8. As a user I can view user's avatars so that I can easily identify users of the application
9. As a User I can create tasks so that I can remember to do things
10. As a user I can view all the most recent tasks, ordered by most recently created first so that I am up to date
11. As a user I can view my list of tasks organised my soonest deadline date
12. As a user I can view other people’s profiles and see their tasks if they are my friend
13. As a logged in user I can friend and unfriend other users so that we can assign each other tasks
14. As a logged in user I can edit my profile so that I can change my profile picture and bio
15. As a logged in user I can update my username and password so that I can change my display name and keep my profile secure
16. As a User I can Set a Deadline for a task so that I can see when they are due to be completed
17. As a user I can have a task that has passed it’s deadline be marked as overdue so that I can see what tasks are overdue
18. As a user I can assign tasks to other people so that I can work in a team, they will be able to update the task as well
19. As a user I want to be able to Create Groups of other users so that I can share tasks with them
20. As a User I want to be able to share tasks with groups I am in so that i can work co-operatively with other Users

## Features

### Existing Features

- Landing Page

- Create Task

- List Tasks

- Create Groups
  
- Groups List
   
- ProfilePage
 
### Future Features

- Group tasks
    - In future versions I would like the user to have the ability to add tasks set to an entire group of people who can interact with the task

- Projects
    - I would like for a user to be able to create a project and then set themselves tasks within that project. essentially grouping tasks together.

## App Structure

### Tasks

- AddToDo component
```
const AddTodo = ({ addTodo, user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState(null);

  const addTodoHandler = e => {
    e.preventDefault();
    addTodo({
      title,
      content,
      deadline: deadline ? moment(deadline).format("YYYY-MM-DD HH:MM") : null,
      completed: "false",
    });

    setTitle('');
    setContent('');
    setDeadline(null);
  };

  return (
    <Form style={{ backgroundColor: "#1c1c1c", padding: "10px", borderRadius: "2px", border: "1px solid #383838" }}>
      <Form.Group controlId='title'>
        <Form.Label style={{ color: "#c9c9c9" }}>Title</Form.Label>
        <Form.Control type='text' placeholder='Enter Todo Title' onChange={e => setTitle(e.target.value)} style={{ backgroundColor: "#1c1c1c", color: "#c9c9c9", borderRadius: "5px", border: "2px solid #383838", fontSize: "1.2rem", padding: "0.5rem", marginBottom: "1rem", width: "100%" }} />
      </Form.Group>

      <Form.Group controlId='content'>
        <Form.Label style={{ color: "#c9c9c9" }}>Content</Form.Label>
        <Form.Control as='textarea' placeholder='Enter Content' onChange={e => setContent(e.target.value)} style={{ backgroundColor: "#1c1c1c", color: "#c9c9c9", borderRadius: "5px", border: "2px solid #383838", fontSize: "1.2rem", padding: "0.5rem", marginBottom: "1rem", width: "100%" }} />
      </Form.Group>

      <Form.Group controlId='deadline'>
        <Form.Label style={{ color: "#c9c9c9" }}>Deadline</Form.Label>
        <DatePicker
          selected={deadline}
          onChange={date => setDeadline(date)}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()} // set minimum date to the current date
          style={{ marginBottom: "1rem", width: "100%" }}
        />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={addTodoHandler} style={{ backgroundColor: "#31b0d5", borderRadius: "5px", border: "none", width: "100%" }}>Add Todo</Button>
    </Form>
  );
};

export default AddTodo;    
```
    - The component returns a <Form> component that contains several <Form.Group> components with labels and input fields for entering information about a new to-do item. The fields include Title, Content, and Deadline.The component also uses the DatePicker component from the react-datepicker library to allow the user to select a deadline for the to-do item.When the user clicks the Add Todo button, the addTodoHandler function is called. This function creates a new to-do object with the input values from the form, including the title, content, deadline, and completed properties. The addTodo function passed in as a prop is then called with the new to-do object as an argument.Finally, the component exports the AddTodo component as the default export of the module, so that it can be imported and used in other parts of the application.
    
    - Reuses
        - Currently this component is only used in the TaskPage page but it could be used again in a page for creating tasks specifically for a group of users or in a project page.

- ToDo List component
```
    const ToDo = (props) => {

  const {
    id,
    owner,
    profile_id,
    profile_image,
    completed,
    deadline,
    title,
    content,
    updated_at,
    todoPage,
    setToDos,
    updateTodo,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner?.username;
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const handleEdit = () => {
    history.push(`/todos/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/todos/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.ToDo}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            {owner?.username}
          </Link>
          <div className="d-flex align-items-center">
            <CheckboxWithLabel
              label="Is completed"
              checked={checked} 
              onChange={()=>{
                setChecked(true)
                setTimeout(()=>{
                  setChecked(false)
                  updateTodo({id, owner: owner?.id, title, deadline, completed: true})
                }, 1000);
              }} 
            />
            <span>{updated_at}</span>
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
  
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {deadline && <Card.Text>{deadline}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default ToDo;
```
    - The component uses the useCurrentUser hook to get the current user and the useHistory hook to get access to the browser's history object for navigating to different pages.The component returns a Card component that displays the details of the to-do item, such as the owner, title, content, and deadline.The component also uses the CheckboxWithLabel component to allow the user to mark the to-do item as completed. When the checkbox is checked, the updateTodo function is called to update the completed property of the to-do item to true. To give the user feedback that the item was completed, the checkbox is automatically unchecked after a 1-second delay using setTimeout.The component also uses the MoreDropdown component to display a dropdown menu with options to edit or delete the to-do item.Finally, the component exports the ToDo component as the default export of the module, so that it can be imported and used in other parts of the application.

    - Reuses
        - The todo function is currently used in the TaskPage and the ProfilePage to list the currently logged in User's Todos. It is used repeatedly in both of these pages as the component renders a single todo item so it is used for each item in the todo list retrieved from the API. Future uses of the ToDo would be to
        pass it the props for the todos from a group's todos or a particular project. 

#### Data Model

- Model
```
    class Todo(models.Model):
    deadline = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)


    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f'{self.id} {self.title}'
```
    - This Django model is called Todo and represents a to-do item. It has several fields, including:
        - deadline: a DateTimeField that stores the deadline for the to-do item.
        - completed: a BooleanField that stores whether the to-do item has been completed.
        - owner: a ForeignKey that links the to-do item to the user who created it.
        - created_at: a DateTimeField that stores the date and time when the to-do item was created.
        - updated_at: a DateTimeField that stores the date and time when the to-do item was last updated.
        - title: a CharField that stores the title of the to-do item.
        - content: a TextField that stores additional details about the to-do item.
        - The Meta class sets the default ordering for the model to be by the ID in descending order (ordering = ['-id']).

        - The __str__ method returns a string representation of the to-do item that includes its ID and title.

- Serializer
```
    class TodoListSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    deadline = serializers.DateTimeField(format="%Y-%m-%d")

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return request.user == obj.owner

    class Meta:
        model = Todo
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'content', 'deadline', 'completed',
        ]


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
```
    - TodoListSerializer: This serializer is used to serialize a list of Todo objects. It includes the following fields:
        - id: the ID of the to-do item.
        - owner: a serialized representation of the User object that owns the to-do item.
        - is_owner: a boolean field indicating whether the current user is the owner of the to-do item.
        - profile_id: the ID of the Profile object associated with the owner of the to-do item.
        - profile_image: the URL of the profile image of the owner of the to-do item.
        - created_at: the date and time when the to-do item was created.
        - updated_at: the date and time when the to-do item was last updated.
        - title: the title of the to-do item.
        - content: the content of the to-do item.
        - deadline: the deadline of the to-do item formatted as a string.
        - completed: a boolean field indicating whether the to-do item has been completed.
        - The serializer also includes a custom method field called is_owner that returns a boolean indicating whether the current user is the owner of the to-do item.

    - TodoSerializer: This serializer is used to serialize a single Todo object. It includes all the fields of the Todo model using the fields = '__all__' option.

- Views
```
    class TodoListCreateAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request, format=None):
		data = request.data
		data['owner'] = request.user.id
		serializer = TodoSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
		else:
			return Response({'errors': serializer.errors, 'message': "Todo create failed"}, status=status.HTTP_400_BAD_REQUEST)
		return Response({'data': serializer.data, 'message': "Todo created successfully"}, status=status.HTTP_201_CREATED)

	def get(self, request, format=None):
		todos = Todo.objects.filter(owner=request.user, completed=False)
		response = get_paginated_response(request, todos, TodoListSerializer)
		print('response: ', response)
		return Response(response, status=status.HTTP_200_OK)


class TodoRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get(self, request, pk, format=None):
        try:
            todo = Todo.objects.get(pk=pk)
            serializer = TodoListSerializer(todo, context={'request': request})
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({'message': "Requested todo doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        try:
            todo = Todo.objects.get(pk=pk)
            serializer = TodoSerializer(todo, data=request.data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({'errors': serializer.errors, 'message': "Todo update failed"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'data': serializer.data, 'message': "Todo updated successfully"}, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({'message': "Requested todo doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            todo = Todo.objects.get(pk=pk)
            serializer = TodoSerializer(todo, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({'errors': serializer.errors, 'message': "Todo updated successfully"}, status=status.HTTP_200_OK)
            return Response({'errors': serializer.errors, 'message': "Todo update failed"}, status=status.HTTP_400_BAD_REQUEST)
        except Todo.DoesNotExist:
            return Response({'message': "Requested todo doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        try:
            todo = Todo.objects.get(pk=pk)
            todo.delete()
            return Response({'message': "Todo deleted successfully"}, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({'message': "Requested todo doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
```
    - TodoListCreateAPIView: This view allows users to create new to-do items and retrieve a list of their incomplete to-do items. It includes the following methods:
        - post: This method creates a new to-do item by deserializing the request data using the TodoSerializer. The owner field is set to the ID of the authenticated user. If the serializer is valid, the to-do item is saved and a response with the serialized data and a success message is returned. If the serializer is invalid, a response with the errors and a failure message is returned.
        - get: This method retrieves a list of incomplete to-do items for the authenticated user using the Todo.objects.filter method. The list is then paginated using a helper function called get_paginated_response and serialized using the TodoListSerializer. The paginated response is then returned.

        - TodoRetrieveUpdateDestroyAPIView: This view allows users to retrieve, update, and delete a single to-do item. It includes the following methods:
            - get: This method retrieves a single to-do item with the specified ID using the Todo.objects.get method. The item is then serialized using the TodoListSerializer and returned in a response.
            - put: This method updates a single to-do item with the specified ID by deserializing the request data using the TodoSerializer. If the serializer is valid, the item is updated and a response with the serialized data and a success message is returned. If the serializer is invalid, a response with the errors and a failure message is returned.
            - patch: This method updates a single to-do item with the specified ID using partial updates by deserializing the request data using the TodoSerializer with partial=True. If the serializer is valid, the item is updated and a response with the serialized data and a success message is returned. If the serializer is invalid, a response with the errors and a failure message is returned.
            - delete: This method deletes a single to-do item with the specified ID using the Todo.objects.get and delete methods. If the item is successfully deleted, a response with a success message is returned. If the item does not exist, a response with a failure message is returned.

### Groups
- Create Group component
    - Reuses
        - The Create group function is currently only used in the ProfilePage but it could be reused as a part of group management page

- GroupList component
    - Reuses
        - The Create group function is currently only used in the ProfilePage but it could be reused as a part of group management page

#### Data Model

- Model
```
    class Group(models.Model):
    owner = models.ForeignKey(
        User, related_name='group_created', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name='group_member')
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f'{self.owner} {self.name}'
```
    - This model called Group represents a group of users. It has several fields, including:
        - owner: a ForeignKey that links the group to the user who created it.
        - name: a CharField that stores the name of the group.
        - members: a ManyToManyField that links the group to the users who are members of it.
        - created_at: a DateTimeField that stores the date and time when the group was created.
        - The Meta class sets the default ordering for the model to be by the ID in descending order (ordering = ['-id']).

        - The __str__ method returns a string representation of the group that includes the owner and name of the group.

- Serializer
```
    class GroupListSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    members = UserSerializer(many=True)

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return request.user == obj.owner

    class Meta:
        model = Group
        fields = ['id', 'owner', 'is_owner', 'name', 'members', 'created_at']
        read_only_fields = ['id', 'created_at']

```
    - This Django REST Framework serializer called GroupListSerializer serializes a Group model for list views. It has several fields, including:
        - owner: a ReadOnlyField that serializes the username of the group's owner.
        - is_owner: a SerializerMethodField that returns a boolean indicating whether the authenticated user is the owner of the group.
        - members: a UserSerializer that serializes the members of the group.
        - Meta: a nested class that specifies the model to be serialized (model = Group), the fields to be included in the serialized output (fields = [...]), and the fields that should be read-only (read_only_fields = [...]).

- Views
```
    class GroupListCreateAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request, format=None):
		data = request.data
		data['owner'] = request.user.id
		serializer = GroupSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
		else:
			return Response({'errors': serializer.errors, 'message': "Group create failed"}, status=status.HTTP_400_BAD_REQUEST)
		return Response({'data': serializer.data, 'message': "Group created successfully"}, status=status.HTTP_201_CREATED)

	def get(self, request, format=None):
		groups = Group.objects.filter(Q(owner=request.user)|Q(members=request.user)).distinct()
		response = get_paginated_response(request, groups, GroupListSerializer)
		print('response: ', response)
		return Response(response, status=status.HTTP_200_OK)


class GroupRetrieveUpdateDestroyAPIView(APIView):
	permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

	def get(self, request, pk, format=None):
		try:
			group = Group.objects.get(pk=pk)
			serializer = GroupListSerializer(group, context={'request': request})
			return Response({'data': serializer.data}, status=status.HTTP_200_OK)
		except Group.DoesNotExist:
			return Response({'message': "Requested status doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

	def put(self, request, pk, format=None):
		try:
			group = Group.objects.get(pk=pk)
			serializer = GroupSerializer(group, data=request.data)
			if serializer.is_valid():
				serializer.save()
			else:
				return Response({'errors': serializer.errors, 'message': "Group update failed"}, status=status.HTTP_400_BAD_REQUEST)
			return Response({'data': serializer.data, 'message': "Group updated successfully"}, status=status.HTTP_200_OK)
		except Group.DoesNotExist:
			return Response({'message': "Requested status doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

	def patch(self, request, pk, format=None):
		try:
			data = request.data
			print('data: ', data)
			group = Group.objects.get(pk=pk)
			serializer = GroupSerializer(group, data=request.data, partial=True)
			if serializer.is_valid():
				serializer.save()
			else:
				return Response({'errors': serializer.errors, 'message': "Group update failed"}, status=status.HTTP_400_BAD_REQUEST)
			return Response({'data': serializer.data, 'message': "Group updated successfully"}, status=status.HTTP_200_OK)
		except Group.DoesNotExist:
			return Response({'message': "Requested status doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


	def delete(self, request, pk, format=None):
		try:
			group = Group.objects.get(pk=pk)
			group.delete()
			return Response({'message': "Group deleted successfully"}, status=status.HTTP_200_OK)
		except Group.DoesNotExist:
			return Response({'message': "Requested status doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)




class UserListAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, format=None):
		users = User.objects.all()

		serializer = UserSerializer(users, many=True)
		return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    
```
    - GroupListCreateAPIView is a view that handles both GET and POST requests. For a POST request, the view creates a new group with the owner set to the current user and returns a response indicating success or failure. For a GET request, the view retrieves all groups that the current user is either the owner of or a member of and returns a paginated response containing these groups.

    - GroupRetrieveUpdateDestroyAPIView is a view that handles GET, PUT, PATCH, and DELETE requests for a specific group identified by the provided primary key (pk). For a GET request, the view retrieves the group with the specified pk and returns a serialized representation of the group. For a PUT request, the view updates the group with the provided data and returns a response indicating success or failure. For a PATCH request, the view partially updates the group with the provided data and returns a response indicating success or failure. For a DELETE request, the view deletes the group with the specified pk and returns a response indicating success or failure.

    - UserListAPIView is a view that handles GET requests and retrieves all users in the system. The view returns a serialized representation of all users.

## Checkbox component
```
function CheckboxWithLabel({ label, checked, onChange }) {
  return (
    <Form.Check
      type="checkbox"
      label={label}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default CheckboxWithLabel;
```
    - The component returns a <Form.Check> component that renders a checkbox input with a label, using the props passed to the component.The type prop of the <Form.Check> component is set to "checkbox" to render a checkbox input.The label prop is used to set the label of the checkbox.The checked prop is used to set the initial checked state of the checkbox.
    The onChange prop is used to handle the change event of the checkbox. When the checkbox is clicked, the function passed to onChange is called with an event object that contains information about the change, such as the new checked state of the checkbox.

    - Reuses
        - The checkbox component is used in the ToDo list component and given these props:
        ```
        label="Is completed"
              checked={checked} 
              onChange={()=>{
                setChecked(true)
                setTimeout(()=>{
                  setChecked(false)
                  updateTodo({id, owner: owner?.id, title, deadline, completed: true})
                }, 1000);
        ```
        - Since it is in the todo component it is reused everytime that a todo item is created. Currently the Task page and the Profile page renders Todo items so this component is present there.

## React

- Overview of React Architecture
    - React is a JavaScript library for building user interfaces. Its architecture is based on a set of key concepts, including components, props, and state.

    Components are the building blocks of React applications. They are reusable pieces of UI that can be composed to create complex user interfaces. Components can be functional or class-based, and they can be customized with props and state.

    Props, short for properties, are a way to pass data from one component to another. They are immutable, meaning that they cannot be changed once they are set. Props are used to customize the behavior or appearance of components and can be accessed as properties of the component's props object.

    State is a way to manage data within a component. Unlike props, state can be changed during the lifetime of a component, and any changes to state will trigger a re-render of the component. State is used to manage user input, control component behavior, or reflect changes in the application's data.

    React applications are typically organized into a tree-like hierarchy of components. Each component is responsible for rendering a specific part of the UI and can contain other components as children. The component hierarchy can be represented as a virtual DOM, which is a lightweight copy of the actual DOM that React uses to update the UI efficiently.

    React's architecture emphasizes modularity, reusability, and declarative programming. By breaking the UI into smaller, reusable components and managing data through props and state, React enables developers to build complex user interfaces that are easier to maintain and scale.

- Advantages of using React
    - In a React application, reusing components can offer several benefits, such as improving code organization by breaking down the UI into smaller, reusable components that can be tested and maintained more easily. Code duplication can be reduced, as developers can use a single component in multiple parts of the application, which streamlines and simplifies the codebase. Consistency in the user interface can be ensured by using the same components with consistent behavior and styling, promoting predictability and usability. Reusing components can also enhance scalability, as developers can add new functionality by composing existing components. Collaboration among developers can be facilitated, as they can share components and work together to improve them, which improves code quality and accelerates development timelines. Overall, reusing components in a React application can lead to improved code quality, reduced development time and costs, and an enhanced user experience, thanks to the modularity and reusability of React components.

- Disadvantages of using React
    - Reusing components in a React application can bring many advantages, but it's essential to acknowledge the associated challenges and limitations. These include maintaining backwards compatibility to avoid breaking existing code, accommodating different use cases, managing large component libraries by keeping them well-organized and documented, balancing customization and consistency, and addressing performance issues. It's crucial to develop a sound strategy for effectively managing and optimizing reusable components to ensure a successful and user-friendly React application.

## Libraries
Libraries dependancies:

1. "@testing-library/jest-dom": "^5.16.5": This library provides custom Jest matchers that can be used to test the state of the DOM.
2. "@testing-library/react": "^11.2.7": This library provides utilities for testing React components with Jest.
3. "@testing-library/user-event": "^12.8.3": This library provides a set of functions to simulate user events (like click or type) for testing purposes.
4. "axios": "^0.21.4": Axios is a popular promise-based HTTP client for making API requests from JavaScript.
5. "bootstrap": "^4.6.0": Bootstrap is a popular front-end framework for building responsive web pages and applications.
6. "js-cookie": "^3.0.1": This library provides a simple way to work with browser cookies in JavaScript.
7. "jwt-decode": "^3.1.2": This library provides a way to decode JSON Web Tokens (JWT) in JavaScript.
8. "moment": "^2.29.4": Moment.js is a library for working with dates and times in JavaScript.
9. "node.js": "^0.0.1-security": This is the Node.js runtime, which allows JavaScript to be run on the server-side.
10. "react": "^17.0.2": React is a popular JavaScript library for building user interfaces.
11. "react-bootstrap": "^1.6.3": React Bootstrap is a set of pre-built React components that implement the Bootstrap framework.
12. "react-datepicker": "^4.10.0": This library provides a customizable date picker component for React.
13. "react-dom": "^17.0.2": React DOM is a package that provides DOM-specific methods for working with React components.
14. "react-infinite-scroll-component": "^6.1.0": This library provides a React component that allows for infinite scrolling behavior on a page.
15. "react-router-dom": "^5.3.0": React Router is a popular library for managing navigation in a React application.
16. "react-scripts": "^4.0.3": React Scripts is a set of scripts and configuration used by Create React App to build, test, and run a React application.
17. "web-vitals": "^1.1.2": This library provides tools for measuring and analyzing web performance metrics.

### UX Design

- Early layout designs
    - This is the layout of the landing page which shows How I wanted this page to look. 
    ![Landing page design](media/images/Landing%20Page.png)
    - With the task page layout I knew I would have to have a component for creating and displaying Todos.
    ![Task page design](media/images/Task%20page.png)
    - With the profile Page design I knew I wanted the Todo's to be listed here again so I would reuse that component. I also needed to create components for group creation and viewing.
    ![Profile page design](media/images/profile.png)

- Styling 
    - When deciding how the website was going to be styled I wanted to go with dark colours that were reminiscent of other website's night mode. Due to wanting to focus on the function of the website I decided that apart from the landing page I didn't want there to be many graphics. With the dark colours I then chose contrasting colours for elements I wanted to draw the user's eye to such as buttons or titles of components. So I used a blue and yellow as that is a complementary color harmony so they contrast with each other but it isnt unpleasant to see them together.

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

#### Backend
- For testing the backend I used Postman to test the endpoints of the API, Them being:
    - '/todos/'
        - Tested get 200 status code, expected: pass, result: pass
        - 
    - '/todos/<id>'
        - Tested get 200 status code, expected: pass, result: pass
        - 
    - '/groups/'
        - Tested get 200 status code with Authentication, expected: pass, result: pass
        - Tested get 200 status code without Authentication, expected: fail, result: fail
    - '/groups/<id>'
        - Tested get 200 status code with Authentication, expected: pass, result: pass
        - Tested get 200 status code without Authentication, expected: fail, result: fail

- I manually tested the funcionailty of the Todos and the groups APIs

    - When testing the functions of the API the form takes in JSON format 


    - Todos list
        - GET
            - I tested whether the to do list can be viewed with and without authorization. I expected a HTTP 200 OK response in when authorized and HTTP 401 when authorized which was what I got. 
        - POST
            - When Unauthorized there is no form for posting a new todo, using postman I attempted to create a new to do and got back a 403 Forbidden response.
            - When authorised I can post a new todo, but the Title field must be filled in or a HTTP 400 Bad Request is returned
    - Todos Detail ('/todos/1')
        - GET
            - I tested whether the item can be viewed with and without authorization. I expected a HTTP 200 OK response in when authorized and HTTP 401 when authorized which was what I got. 
        - POST
            - This view does not allow post http requests, returned status code 400 on Postman
        - PUT
            - When logged in as the user that created the todo there is a form for PATCH-ing the todo item. other users are not able to send PATCH requests, neither are anonymous users. 403 Forbidden
        - DELETE
            - Same as above only the authorized user who is the 'owner' of the todo can delete a todo. 403 Forbidden

    - Groups list
        - GET
            - I tested whether the group list can be viewed with and without authorization. I expected a HTTP 200 OK response in when authorized and HTTP 401 when authorized which was what I got. 
        - POST
            - When Authorized I can post a new group

    - Groups Detail
        - GET
            - I tested whether the item can be viewed with and without authorization. I expected a HTTP 200 OK response in when authorized and HTTP 401 when authorized which was what I got. 
        - POST
            - This view does not allow post http requests, returned status code 400 on Postman
        - PUT
            - When logged in as the user that created the group there is a form for PATCH-ing the todo item. other users are not able to send PATCH requests, neither are anonymous users. 403 Forbidden
        - DELETE
            - Same as above only the authorized user who is the 'owner' of the group can delete a group. 403 Forbidden

#### Frontend

    - I manually tests the functionality of the Frontend app, checking for succesful data manipulation of Tasks and Groups:
        -Tasks
            - Creating a task on the ToDo page works successfully, the task shows up in the deployed heroku API. The Title is currently the only field that cannot be left blank and it correctly throws up a message when attempted. The newly created task then shows up in the ToDo list. ToDo list items that arn't associated with the current user do not appear.
            - With the todo list component on the TaskPage and the profile page the delete button allows the user to delete the todo succesfully from the backend. 
            - Pressing the edit button should open a modal that allows the user to change the title, content, or deadline data of the task and then save it. when tested this succesfully updates the backend data.
            - On the Profile page and landing page I GET todo data and count the number of todos. I expect the profile page to count the todos with the currently logged in user as owner and the landing page counts the number of non-complete tasks. Both numbers are correct.
            - The complete checkbox should mark a task as completed and as the todo list only shows uncompleted tasks the todo list should dissapoear when i check it as complete. Which it does.

        - Groups
            - When Creating a group on the profile page, I tested whether you could leave the name of the group blank expecting an error message and it passed.
            - When creating a group with no members, I expected the group to be created with only the currently logged in user as the sole member, which was correct
            - With the group list i expected to be able to see both groups that had been created by the user but also groups created by other users that the current user was a member of, which is correct.
            - When removing or adding a member to the group I expected the Backend API to reflect this change, And this was correct. 

        - Authentication
            - Registering a new account works successfully. Inputting a username that already exists, no username, passwords that dont match, or commonly used passwords ('password') throws up the correct error messages.
            - Logging in works correctly, inputting invalid username or passwords throws up the corrrect error message.
            - I expected the NavBar to change when logged in as a user, and this was correct.
            - I expected 404 errors to be thrown up when trying to access urls that require authorization, eg. taskpage, profilepage etc. , The pages loaded but the user is unable to create a new todo or group, getting a status code 401 unauthorized response.

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

### Code

- Tutorials I followed to create the basis of this code are as follows:
    -https://www.youtube.com/watch?v=W9BjUoot2Eo 
- The skeleton of this code was based off of the Code Institute "Moments" code-along project and then heavily altered.






# Task Management django rest framework

## Deployment

- The site was deployed using Code Institute's mock terminal for Heorku. The steps to deploy are as follows
    - Create a new Heroku App
    - Link the heroku app to a PostgreSQL database hosted on heroku
    - Link the heroku app to the repository
    - Click on Deploy

## Manual Testing

- I manually tested the funcionailty of the Todos and the groups APIs

    - Todos list
        - GET
            - I tested whether the to do list can be viewed with and without authorization. I expected a HTTP 200 OK response in both cases 
            and that was true
        - POST
            - When Unauthorized there is no form for posting a new todo, using postman I attempted to create a new to do and got back a 403 Forbidden response.
            - When authorised I can post a new todo, but the Title field must be filled in or a HTTP 400 Bad Request is returned
    - Todos Detail ('/todos/1')
        - GET
            - I tested whether the item can be viewed with and without authorization. I expected a HTTP 200 OK response in both cases 
            and that was true
        - POST
            - This view does not allow post http requests, returned status code 400 on Postman
        - PATCH
            - When logged in as the user that created the todo there is a form for PATCH-ing the todo item. other users are not able to send PATCH requests, neither are anonymous users. 403 Forbidden
        - DELETE
            - Same as above only the authorized user who is the 'owner' of the todo can delete a todo. 403 Forbidden

    - Groups list
        - GET
            - The list of groups can only be viewed by an authorized user who is either the owner of the group or a member as defined in this code:
            ```
            def get(self, request, *args, **kwargs):
            """Return a list of groups owned by the current user."""
            if request.user.is_anonymous:
            return Response(status=status.HTTP_404_NOT_FOUND)
            groups = self.get_queryset().filter(
            Q(owner=request.user) | Q(members=request.user)
            ).distinct()
            serializer = self.get_serializer(groups, many=True)
            return Response(serializer.data)
            ```
            - anonymous users get a 404 not found error message and other authorized members get a 200 but can't see unaffiliated groups.
        - POST
            - When Authorized I can post a new todo and the creator is automatically added as a member

    - Groups Detail
        - GET
            - I tested whether the item can be viewed with and without authorization. I expected a HTTP 200 OK response in both cases 
            but when logging out on the page the anonymous user was not able to access the view:
                - "Exception Type: TypeError at /groups/1/
                Exception Value: Field 'id' expected a number but got <django.contrib.auth.models.AnonymousUser object at 0x7fd74a985f40>."
        - POST
            - This view does not allow post http requests, returned status code 400 on Postman
        - PATCH
            - When logged in as the user that created the group there is a form for PATCH-ing the todo item. other users are not able to send PATCH requests, neither are anonymous users. 403 Forbidden
        - DELETE
            - Same as above only the authorized user who is the 'owner' of the group can delete a group. 403 Forbidden



