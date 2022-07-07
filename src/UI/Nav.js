import feather from 'feather-icons';

const Nav = () => {

    const icon = feather.icons.circle.toSvg();
// {
//    name: 'x',
//    contents: '<line ... /><line ... />`,
//    tags: ['cancel', 'close', 'delete', 'remove'],
//    attrs: {
//      class: 'feather feather-x',
//      xmlns: 'http://www.w3.org/2000/svg',
//      width: 24,
//      height: 24,
//      viewBox: '0 0 24 24',
//      fill: 'none',
//      stroke: 'currentColor',
//      'stroke-width': 2,
//      'stroke-linecap': 'round',
//      'stroke-linejoin': 'round',
//    },
//    toSvg: [Function],
// }


    return (
        <div className="max-w-screen-xl w-full top-0 absolute border-2 border-blue-400">
            {/* <div className='flex justify-end w-2/3 right-0'>
                <div 
                dangerouslySetInnerHTML={{__html: icon}}
                className=""
                >
                </div>
            </div> */}

            meow meow
        </div>
    )
}

export default Nav;