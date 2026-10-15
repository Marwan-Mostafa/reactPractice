import './SideBar.css';
import TagButton from '../Button/Button.js'

export default function RenderSideBar() {

    const categories = [
        {
            id: 1,
            buttonName: "أخر المقالات",
        },
    ]

    const categoriesList = categories.map((cat) => {
        return (
            <TagButton key={cat.id} buttonName={cat.buttonName} children={cat.children} />
        )
    })
    return (
        <div className="sidebar-content">
            {categoriesList}
        </div>
    );
}