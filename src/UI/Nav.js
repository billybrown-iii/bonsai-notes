import feather from 'feather-icons';
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import MiniButton from './MiniButton';

const Nav = ({ selectedPage, deletePage }) => {

    const icon = feather.icons["chevrons-down"].toSvg({"stroke-width": 2});

 if (selectedPage) return (
    // width of 22.22% = 1/3 of 2/3
        <Menu menuButton={<div className='absolute w-[22.22%] right-0 flex'>
                <MiniButton icon={icon} />
            </div> 
        } transition>
            <MenuItem onClick={deletePage}>Delete</MenuItem>
        </Menu>
    )
}

export default Nav;