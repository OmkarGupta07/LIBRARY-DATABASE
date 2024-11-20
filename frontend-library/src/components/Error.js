import {useRouteError} from 'react-router-dom';

const Error=()=>{
    const {status,statusText}=useRouteError();

    return (
        <div>
            <h1>Hey ComeBack After SomeTime  While We are Fixing ⚙️</h1>
            <h5>{status}</h5>
            <h5>{statusText}</h5>
        </div>
    )

};

export default Error; 