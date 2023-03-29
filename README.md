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

- Group tasks
    - In future versions I would like the user to have the ability to add tasks set to an entire group of people who can interact with the task

- Projects
    = I would like for a user to be able to create a project and then set themselves tasks within that project. essentially grouping tasks together.

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
    - The code defines a React component called AddTodo which is a form for adding new todo items. The component uses useState to initialize three state variables to track the user's input for the title, content, and deadline fields. The addTodoHandler function is called when the user clicks the "Add Todo" button, and it calls the addTodo function passed as a prop with the input values, and resets the input fields. The form is styled using react-bootstrap components and customized inline styling. The component is exported as a default export for use in other React components.
    
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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    // console.log(id)
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
                {owner}
            </Link>
            <div className="d-flex align-items-center">
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
    - The code defines a functional component called ToDo that renders a to-do item using props including id, owner, profile_id, profile_image, completed, deadline, title, content, updated_at, todoPage, and setToDos. It also imports and uses a MoreDropdown component. The component defines two functions, handleEdit and handleDelete, which handle editing and deleting the to-do item using the useHistory hook and axios. The ToDo component renders a Card component with a Media component containing a link to the owner's profile and a MoreDropdown component. It also renders the to-do item's title, content, and deadline.

    - Reuses
        - The todo function is currently used in the TaskPage and the ProfilePage to list the currently logged in User's Todos. Future uses of the ToDo would be to
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
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
    ```
    - Here's a brief explanation of each field:

        - deadline: This field is a DateTimeField that stores the deadline for the task. It's optional, which is why null=True and blank=True are set.
        - completed: This field is a BooleanField that keeps track of whether the task has been completed or not. By default, it's set to False.
        - owner: This field is a ForeignKey that links each task to a user. It's set to on_delete=models.CASCADE, which means that if the user is deleted, all associated tasks will be deleted as well.
        - created_at: This field is a DateTimeField that stores the date and time when the task was created. auto_now_add=True means that it will be automatically set to the current date and time when the task is created.
        - updated_at: This field is a DateTimeField that stores the date and time when the task was last updated. auto_now=True means that it will be automatically updated to the current date and time whenever the task is saved.
        - title: This field is a CharField that stores the title of the task. It has a maximum length of 255 characters.
        - content: This field is a TextField that stores the content of the task. It's optional, which is why blank=True is set.
        - The Meta class is used to define some metadata about the model. In this case, it sets the default ordering to be by created_at, in descending order (i.e., newest tasks first).

- Serializer
    ```
    class TodoSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    deadline = serializers.DateTimeField(format="%Y-%m-%d")

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Todo
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'content', 'deadline', 'completed',
        ]
    ```
    - The serializer has several fields including "owner" which is a read-only field that returns the owner's username, "is_owner" which is a method field that returns whether the current user is the owner of the task, "profile_id" which is a read-only field that returns the ID of the owner's profile, "profile_image" which is a read-only field that returns the URL of the owner's profile image, and "deadline" which formats the date-time in a specific way.

    The serializer also has a method field "get_is_owner" which checks if the current user is the owner of the task.

    The serializer's Meta class defines the model and fields to be serialized, including 'id', 'owner', 'is_owner', 'profile_id', 'profile_image', 'created_at', 'updated_at', 'title', 'content', 'deadline', and 'completed'.

- Views
    ```
    class TodoList(generics.ListCreateAPIView):
    queryset = Todo.objects.all().order_by('-created_at')
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__profile',
    #    'project'
    ]
    search_fields = [
        'owner__username',
        'title',
    #    'project',
    ]
    ordering_fields = [
        'deadline',
        'created_at',
        'updated_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Todo.objects.all().order_by('-created_at')
    ```
    - The first view is called "TodoList" and inherits from generics.ListCreateAPIView. It shows a list of all the tasks and allows users to create new tasks.

    The queryset attribute sets the list of objects that will be returned by the view. It retrieves all Todo objects and orders them by their creation date in descending order.

    The serializer_class attribute sets the serializer that will be used to convert Todo objects to JSON format.

    The permission_classes attribute sets the list of permission classes that determine who can access the view. In this case, IsAuthenticatedOrReadOnly allows authenticated users to create new tasks and all users to view the list of tasks.

    The filter_backends attribute sets the list of filter backends to be used for filtering the queryset. In this case, OrderingFilter, SearchFilter, and DjangoFilterBackend are used.

    The filterset_fields attribute sets the list of fields that can be used to filter the queryset by using query parameters.

    The search_fields attribute sets the list of fields that can be used to search for a task by using query parameters.

    The ordering_fields attribute sets the list of fields that can be used to order the queryset by using query parameters.

    The perform_create method is called when a new task is created. It sets the owner of the task to the user who made the request.

    The second view is called "TodoDetail" and inherits from generics.RetrieveUpdateDestroyAPIView. It shows the details of a specific task and allows users to update or delete it.

    The queryset attribute sets the list of objects that will be returned by the view. It retrieves all Todo objects and orders them by their creation date in descending order.

    The serializer_class attribute sets the serializer that will be used to convert Todo objects to JSON format.

    The permission_classes attribute sets the list of permission classes that determine who can access the view. In this case, IsOwnerOrReadOnly allows only the owner of the task to update or delete it, while all users can view the details of the task.

### Groups
- CreateToDo component
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
        ordering = ['name']

    def __str__(self):
        return f'{self.owner} {self.name}'
    ```
    - Here's a brief explanation of each field:
        - owner: This field is a ForeignKey that links each group to its creator (a User object). related_name='group_created' creates a reverse relationship from User objects to their created groups, which can be accessed via the group_created attribute. on_delete=models.CASCADE means that if the associated user is deleted, all associated groups will also be deleted.
        - name: This field is a CharField that stores the name of the group. It has a maximum length of 100 characters.
        - members: This field is a ManyToManyField that links each group to its members (multiple User objects). related_name='group_member' creates a reverse relationship from User objects to the groups they belong to, which can be accessed via the group_member attribute.
        - created_at: This field is a DateTimeField that stores the date and time when the group was created. auto_now_add=True means that it will be automatically set to the current date and time when the group is created.
        - The Meta class is used to define some metadata about the model. In this case, it sets the default ordering to be by name, in ascending order.

- Serializer
    ```
    class GroupSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Group
        fields = ['id', 'owner', 'is_owner', 'name', 'members', 'created_at']
        read_only_fields = ['id', 'created_at']
    ```
    - This is a serializer for the "Group" model that includes fields for the group's owner, name, members, and creation date.
    The serializer has a method field for checking if the current user is the owner of the group, and the 'id' and 'created_at' fields are read-only.

- Views
    ```
    class GroupList(generics.CreateAPIView):
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Group.objects.all().order_by('-created_at')
    allowed_methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']

    def get(self, request, *args, **kwargs):
        """Return a list of groups owned by the current user."""
        if request.user.is_anonymous:
            return Response(status=status.HTTP_404_NOT_FOUND)
        groups = self.get_queryset().filter(
            Q(owner=request.user) | Q(members=request.user)
        ).distinct()
        serializer = self.get_serializer(groups, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    allowed_methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)
    ```
    - The GroupList view inherits from generics.CreateAPIView and handles listing all groups and creating new ones.

        - serializer_class: This attribute sets the serializer class that will be used to convert the model instances to JSON.
        - permission_classes: This attribute sets the permission classes that determine who can access the view. In this case, IsAuthenticatedOrReadOnly allows authenticated users to create new groups and all users to view the list of groups.
        - queryset: This attribute sets the queryset for the view. It retrieves all Group objects and orders them by their creation date in descending order.
        - allowed_methods: This attribute sets the list of HTTP methods allowed for this view.
        - get(): This method handles GET requests to the view. It returns a list of all groups owned by the current user or where the user is a member.
        - perform_create(): This method handles creating new groups. It sets the owner of the group to the current user.
    
    - The GroupDetail view inherits from generics.RetrieveUpdateDestroyAPIView and handles viewing, updating, and deleting individual groups.

        - serializer_class: This attribute sets the serializer class that will be used to convert the model instances to JSON.
        - queryset: This attribute sets the queryset for the view. It retrieves all Group objects.
        - permission_classes: This attribute sets the permission classes that determine who can access the view. In this case, IsOwnerOrReadOnly allows only the owner of the group to update or delete it, while all users can view the details of the group.
        - allowed_methods: This attribute sets the list of HTTP methods allowed for this view.
        - get_queryset(): This method restricts the queryset to only the groups owned by the current user.

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


```

#### Authentication

```

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

