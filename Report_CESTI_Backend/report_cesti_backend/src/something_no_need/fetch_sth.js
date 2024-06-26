let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    // headers.append('Origin','http://localhost:3000');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Accept', 'application/json')
headers.append('Content-Type', 'application/json; charset=utf-8')
// for (let i = 5; i < 600; i++) {
//     fetch("http://127.0.0.1:3000/api/chi_tieu/"+i, {
//         method: "delete",
//         mode: "cors",
//         headers,
//     }).then(e => e.json()).then(json => console.log(json))
// }
for (let i = 4; i < 100; i++) {
    fetch("http://127.0.0.1:3000/api/chi_tieu", {
        method: "post",
        mode: "cors",
        headers,
        body: JSON.stringify({
            batDau: "2024-05-27",
            ketThuc: "2026-05-27",
            tenChiTieu: "Chỉ tiêu" + i,
            trangThai: "Đang hoạt động"
        }),
    }).then(e => e.json()).then(json => console.log(json))
}