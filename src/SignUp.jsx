import {useState} from "react";

const SignUp = () => {

    const url = "http://localhost:3000"

    const [formData, setFormData] = useState ({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
        const request = new Request(url + '/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const response = await fetch(request);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
        ...formData,
        [name]: value,
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="please enter email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    vaule={formData.username}
                    placeholder="Please enter username"
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="enter your password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
export default SignUp;