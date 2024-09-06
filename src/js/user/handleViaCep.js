document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cep');
    const apiUrl = document.querySelector('meta[name="api-url"]').getAttribute('content');

    cepInput.addEventListener('input', async () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length === 8) {
            try {
                document.querySelector('.error').innerHTML = '';
                const response = await fetch(`${apiUrl}/api/cep/${cep}`);
                const data = await response.json();

                if(data.err)
                    throw Error(data.err)

                document.querySelector('input[name="street"]').value = data.cep.logradouro || '';
                document.querySelector('input[name="neighborhood"]').value = data.cep.bairro || '';
                document.querySelector('input[name="city"]').value = data.cep.localidade || '';
                document.querySelector('input[name="state"]').value = data.cep.uf || '';

                console.log(data.time);
                
            } catch (error) {
                document.querySelector('.error').innerHTML ='Erro ao buscar CEP:' + error;
                console.error('Erro ao buscar CEP:', error);
            }
        }
    });
});