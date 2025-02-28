import React from 'react';
import { toast } from 'sonner';

const Language = () => {

    const languages = [
        { lang: "English", id_htmlfor: "eng" },
        { lang: "Tamil", id_htmlfor: "tam" },
        { lang: "Malayalam", id_htmlfor: "mal" },
        { lang: "Hindi", id_htmlfor: "hin" },
        { lang: "Chinese", id_htmlfor: "chi" },
        { lang: "French", id_htmlfor: "fre" }
    ];

    return (
        <div>
            <div className="container mt-3">
                <div className="d-flex justify-content-center align-items-center vh-100 flex-wrap">
                    <table>
                        <tbody>
                            {languages.map(lan =>  <tr key={lan.lang}>
                                <td><label htmlFor={lan.id_htmlfor} className="fs-5 fw-bold">{lan.lang}</label></td>
                                <td><input type="radio" className="mt-2" name="language" id={lan.id_htmlfor} /></td>
                            </tr>)}
                        </tbody>
                    </table>
                    <button className="btn btn-warning shadow" onClick={() => toast.success("English only supported")}>Change Language</button>
                </div>
            </div>
        </div>
    );
}

export default Language;