import feather from 'feather-icons';

const Nav = () => {

    const icon = feather.icons["chevrons-down"].toSvg({"stroke-width": 2});

    return (
    // width of 22.22% = 1/3 of 2/3
    <div className='absolute w-[22.22%] right-0'>
        <div
        dangerouslySetInnerHTML={{__html: icon}}
        className="w-fit ml-3 mt-1.5 border-2 border-zinc-800 rounded-xl p-1.5"
        >
        </div>
    </div>
    )
}

export default Nav;