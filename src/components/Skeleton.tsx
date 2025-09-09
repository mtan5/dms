import classNames from "classnames";

interface SkeletonProps {
    times:number;
    className:string;
}

function Skeleton({times, className}: SkeletonProps){
//similar to making a for loop
    const outer = classNames(
        'relative', //allow to position the inner element absolutely
        'overflow-hidden',//hide the inner element f they are not overlapping
        'bg-gray-200',
        'rounded',
        'mb-2.5',
        className
    );
    const inner = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',//fill, expand the outer div
        '-translate-x-full', //makes the inner div to move off to the far left hand side of the outer div (from left to right)
        //'-translate-x-full', //(from right to left)
        'bg-gradient-to-r',
        'from-gray-200',
        'via-white',
        'to-gray-200'
    );
    const boxes = Array(times).fill(0).map((_, i) => {
        return (
        <div key={i} className={outer}>
            <div className={inner}/>
        </div>);
    });
    return boxes;
}

export default Skeleton;