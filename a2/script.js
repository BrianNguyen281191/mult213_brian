const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
        </div>
    );
};

const Footer = (props) => {
    return (
        <footer>
            <p>{props.message}</p>
            <p>Copyright © 2023 My Website. All rights reserved.</p>
        </footer>
    );
};

const TodoList = (props) => {
    const todoItems = props.todos.map((todo) => (
        <li key={todo.id}>
            <input type="checkbox" defaultChecked={todo.completed} />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text}
            </span>
        </li>
    ));

    return (
        <div>
            <ul>{todoItems}</ul>
            <button>Remove Completed</button>
        </div>
    );
};

const Card = (props) => {
    return (
        <div className="card">
            <h2>{props.title}</h2>
            <h3>{props.subtitle}</h3>
            <img src={props.image} alt="Card" />
            <p>{props.content}</p>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Header title="Welcome to My Website!" message="Thanks for visiting my site." />
            <TodoList
                todos={[
                    { id: 1, text: "Complete React assignment", completed: false },
                    { id: 2, text: "Study for math test", completed: false },
                    { id: 3, text: "Do laundry", completed: true },
                ]}
            />
            <Card
                title="Brian Nguyen"
                subtitle="Student of Interactive Design and Technology (IDT)"
                image="brian.jpg"
                content="Hi, I'm Brian Nguyen, a dedicated student in Interactive Design and Technology. I enjoy creating interactive, user-friendly designs and applications."
            />
            <Footer message="Contact me at nguyen6475@saskpolytech.ca" />

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

