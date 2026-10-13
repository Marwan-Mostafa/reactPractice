import './Post.css';

export default function RenderPost({ postName = "_", body = "This is the post body" }) {
    return (
        <div style={{
            padding: "10px",
            border: "solid teal 5px",
            background: "white",
            margin: "25px",
            textAlign: "center",

        }}>

            <h2>{postName}</h2>
            <hr />
            <p>{body}</p>

        </div>
    );
}