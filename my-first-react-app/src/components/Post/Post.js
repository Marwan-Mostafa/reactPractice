import './Post.css';

export default function RenderPost({ title, body }) {
    return (
        <article className="post-card">

            <h2 className="post-title">
                {title}
            </h2>

            <hr />

            <p className="post-body">
                {body}
            </p>

        </article>
    );
}