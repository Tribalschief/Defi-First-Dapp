import React , { createContext , useContext } from "react";
import toast , {Toaster } from "react-hot-toast";

const ToastContext = createContext();

const BrandColor = "#FF00FF";
const ToastStyle = {
    common:{
        background: BrandColor,
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "10px",
    
    },
    processing:{
        borderLeft:"5px solid #FF00FF",

    },
    approve:{
        borderLeft:"5px solid #00FF00",
    },
    complete:{
        borderLeft:"5px solid #00FF00",
    },
    reject:{
        borderLeft:"5px solid #FF0000",
    },
    failed:{
        borderLeft:"5px solid #FF0000",
    },
    info:{
        borderLeft:"5px solid #0000FF",
    },    
}

export const ToastProvider = ({children}) => {
    const showProcessing = (message) => {
        return toast.loading(message, {
            style: {
                ...ToastStyle.common,
                ...ToastStyle.processing,}
        });
    }
    const showApprove = (message) => {
        return toast.loading(message, {
            style: {
                ...ToastStyle.common,
                ...ToastStyle.approve,}
        });
    }
    const showComplete = (message) => {
        return toast.loading(message, {
            style: {
                ...ToastStyle.common,
                ...ToastStyle.complete,}
        });
    }
    const showReject = (message) => {
        return toast.loading(message, {
            style: {
                ...ToastStyle.common,
                ...ToastStyle.reject,}
        });
    }
    const showFailed = (message) => {
        return toast.loading(message, {
            style: {
                ...ToastStyle.common,
                ...ToastStyle.failed,}
        });
    }
    const showInfo = (message) => {
        return toast.loading(message, {
            style: {
                ...ToastStyle.common,
                ...ToastStyle.info,}
        });
    }
    const updateToast = (id,state, message) => {
        toast.dismiss(id);
        switch(state){
            case "processing":
                return showProcessing(message);
            case "approve":
                return showApprove(message);
            case "complete":
                return showComplete(message);
            case "reject":
                return showReject(message);
            case "failed":
                return showFailed(message);
            case "info":
                return showInfo(message);
            default:
                return toast.error("Unknown state");
        }
    }

    const notify = {
        start:(message = "Processing...") => {
            return showProcessing(message);
        },
        update:(id,state,message) => {
            return updateToast(id,state,message);
        },
        approve:(id,message = "Transaction Approved") => {
            return updateToast(id,"approve",message);
        },
        complete:(id,message = "Transaction Completed") => {
            return updateToast(id,"complete",message);

        },
        reject:(id,message = "Transaction Rejected") => {
            return updateToast (id,"reject",message);
        },
        failed:(id,message = "Transaction Failed") => {
            return updateToast(id,"failed",message);
        },
        info:(id,message = "Transaction Info") => {
            return updateToast(id,"info", message);
        }
    }
    return (
        <ToastContext.Provider 
        value={{showProcessing ,
            showApprove,
            showComplete,
            showReject,
            showFailed,
            showInfo,
            updateToast,
            notify
        }}>
            <Toaster positon="bottom-right" toastOptions={{
                success:{
                    iconTheme:{
                        primary: BrandColor,
                        secondary: "white",
                    },
                    duration: 3000,
                    style:{
                        background: BrandColor,
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        padding: "10px",
                        borderRadius: "10px",
                    },
                },
                error:{
                    iconTheme:{
                        primary: "#FF0000",
                        secondary: "white",
                    },
                    duration: 3000,
                    style:{
                        background: BrandColor,
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        padding: "10px",
                        borderRadius: "10px",
                    },
                },
                loading:{
                    iconTheme:{
                        primary: "#FF00FF",
                        secondary: "white",
                    },
                    duration: 3000,
                    style:{
                        background: BrandColor,
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        padding: "10px",
                        borderRadius: "10px",
                    },
                }
                
            }}/>
            {children}
            
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
}