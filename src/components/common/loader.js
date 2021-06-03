import React, { Fragment } from 'react';

const Loader = () => {
    // const [show, setShow] = useState(false);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setShow(false)
    //       }, 1000);
        
    // },[show]);
    return (
        <Fragment>
            <div className="loader-wrapper" >
                <div className="loader">
                    <div className="whirly-loader"> </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Loader;