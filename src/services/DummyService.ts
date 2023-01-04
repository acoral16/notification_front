export class DummyService {

    public static async writeMessage(categories: Array<any>, message: string): Promise<unknown> {

        var myHeaders = new Headers();
        myHeaders.append("accept", "application/hal+json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cors", "no-cors");

        let raw = JSON.stringify({
            "categories": categories,
            "msn": "string"
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5768/api/v1/messages/log/message", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }
}
