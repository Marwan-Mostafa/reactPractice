import './SideBar.css';
import TagButton from '../Button/Button.js'
export default function RenderSideBar() {
    return (
        <div className="sidebar-content">
            <TagButton buttonName="أخر مقالات">
                <div>
                    <span>😘😘😘</span>
                </div>
            </TagButton>


            <TagButton />
            <TagButton />
            <TagButton />
            <TagButton />
        </div>
    );
}