import { useEffect } from "react"

export const useDisabledScrollBounce = () => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden", "overscroll-none")
        return () => {
            document.body.classList.remove("oveflow-hidden", "overscroll-none")
        }
    }, [])
}