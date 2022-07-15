import feather from 'feather-icons';
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import MiniButton from './MiniButton';
const icon = feather.icons["edit"].toSvg({"stroke-width": 2});

const Nav = ({ selectedPage, deletePage }) => {

 if (selectedPage) return (
    // width of 22.22% = 1/3 of 2/3
        <Menu menuButton={<div className='absolute w-[22.22%] right-0 flex pt-2 pl-2'>
            <MiniButton icon={icon}><span className='ml-1'>Page Settings</span></MiniButton>
            </div> 
        } transition>
            <MenuItem onClick={deletePage}>Delete Page</MenuItem>
        </Menu>
    )
}

export default Nav;