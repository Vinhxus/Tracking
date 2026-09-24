import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../lib/axios';

export default function Auth(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [tab,setTab] = useState<"Sign in" | "Sign up">("Sign in");
    const [mail,setMail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    function signup() {
    setError("");
    if (!mail || !name || !password || !confirmPassword) {
        setError("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp!");
        return;
    }

    setLoading(true);
    api.post("/auth/signup", { mail, name, password })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            setLoading(false);
            console.log("User signed up successfully:", res.data);
            navigate("/");
        })
        .catch((err) => {
            console.error("Error occurred while signing up:", err);
            setError("Đã xảy ra lỗi khi đăng ký!");
            setLoading(false);
        });
}

    function signin() {
        console.log("signin được gọi");
        setError("");
        console.log("payload gửi đi:", { mail, password }); // thêm dòng này
        if (!mail || !password) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        setLoading(true);
        api.post("/auth/login", { mail, password })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                setLoading(false);
                console.log("User signed in successfully:", res.data);
                navigate("/");
            })
            .catch((err) => {
                console.error("Error occurred while signing in:", err);
                setError("Đã xảy ra lỗi khi đăng nhập!");
                setLoading(false);
            });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (tab === "Sign up") {
            signup();
        } else {
            signin();
        }
    }

    return (
        <div data-theme="night" className =" w-screen h-screen flex items-center justify-center">
            <div className="h-120 w-160 border-2 flex flex-col items-center rounded-2xl gap-3">
                <nav className="h-max w-max px-2 py-1 border-2 rounded flex justify-center mt-5 ml-2">
                    <button 
                        type="button"
                        className={`h-10 w-40 border-r-2 border-white rounded cursor-pointer hover:bg-secondary ${tab === "Sign in" ? "bg-blue-400" : ""}`}
                        onClick={() => setTab("Sign in")}
                    >
                        Sign in
                    </button>
                    <button 
                        type="button"
                        className={`h-10 w-40 border-l-2 border-white rounded cursor-pointer hover:bg-secondary ${tab === "Sign up" ? "bg-blue-400" : ""}`}
                        onClick={() => setTab("Sign up")}
                    >
                        Sign up
                    </button>
                </nav>
                <div className=" w-full flex-1 flex flex-col items-center justify-center gap-3 ">
                    <form className="flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit}>
                        {error && (
                            <p className="text-red-500">
                                {error}
                            </p>
                        )}
                        <div className="flex flex-col gap-1">
                            <span> mail: </span>
                            <input type="text" placeholder="Username" 
                            className="px-2 py-1 h-10 w-80 border-2 rounded"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            />
                        </div>
                        { tab === "Sign up" && (
                            <div className="flex flex-col gap-1">
                                <span> name: </span>
                                <input type="text" placeholder="Username" 
                                className="px-2 py-1 h-10 w-80 border-2 rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <span> password: </span>
                            <input type="password" placeholder="Password" 
                            className="px-2 py-1 h-10 w-80 border-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        { tab === "Sign up" && (
                            <div className="flex flex-col gap-1">
                                <span> confirm: </span>
                                <input type="password" placeholder="Confirm Password" 
                                className="px-2 py-1 h-10 w-80 border-2 rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        )}

                        {loading
                            ? "Loading..."
                            : tab === "Sign up"
                                ? "Sign up"
                                : "Sign in"
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
