import class_name from 'classnames';

interface PanelProps{
    children?: React.ReactNode;
    className:String;
    [x:string]: any;
}

function Panel({children, className, ...otherProps}: PanelProps){
    const officialClassNames = class_name(className, 'border rounded p-3 shadow bg-white w-full');
    return(
        <div {...otherProps} className={officialClassNames}>
            {children}
        </div>
    );    
}

export default Panel;