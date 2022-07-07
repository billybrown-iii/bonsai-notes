import feather from 'feather-icons';

const Nav = () => {

    const icon = feather.icons.settings.toSvg();

    return (
        <div className="absolute flex justify-end max-w-screen-xl w-full top-0">
            <div className='flex justify-end w-2/3'>
                <div id="nav-area" className="w-1/3">
                    <div
                     dangerouslySetInnerHTML={{__html: icon}}
                     className="w-fit ml-3 mt-4"
                    >
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Nav;