import { useEffect, useState } from "react";

const UseHasMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(()=> {
        setHasMounted(true);
    }, [])
    return hasMounted;
}

export default UseHasMounted;


