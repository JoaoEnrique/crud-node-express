document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const apiUrl = document.querySelector('meta[name="api-url"]').getAttribute('content');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const token = getCookie('token');
        try {
            document.querySelector('.error').innerHTML = '';
            const url = data.id && data.id != 0 ? `${apiUrl}/api/users/${data.id}` : `${apiUrl}/api/users`;
            const method = data.id && data.id != 0 ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorJson = await response.json(); // Converte a resposta para JSON
                console.error('Erro na solicitação: ', errorJson);
                document.querySelector('.error').innerHTML ='Erro ao enviar solicitação: ' + errorJson.msg;
                return;
            }

            // Redirecione ou faça algo com a resposta
            location.replace('/users/list');

        } catch (error) {
            document.querySelector('.error').innerHTML ='Erro ao enviar solicitação' + error;
            console.error('Erro ao enviar solicitação', error);
        }
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
