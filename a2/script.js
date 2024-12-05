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
        <div>
            <p>{props.message}</p>
            <p>Copyright © 2023</p>
        </div>
    );
};

const TodoList = (props) => {
    return (
        <div>
            <ul>
                {props.todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
            <button>Remove</button>
        </div>
    );
};

const Card = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <h3>{props.subtitle}</h3>
            <img src={props.image} alt="" />
            <p>{props.content}</p>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Header title="Welcome" message="Hello!" />
            <TodoList todos={[{ id: 1, text: "Task 1" }, { id: 2, text: "Task 2" }]} />
            <Card title="Card" subtitle="Subtitle" image="https://via.placeholder.com/100" content="Content" />
            <Footer message="Footer Message" />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
