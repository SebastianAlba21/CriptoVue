import { ref, reactive, onMounted, computed } from 'vue'

export default function useCripto() {
	const criptomonedas = ref([])
	const monedas = ref([
		{
			codigo: 'USD',
			texto: 'Dolar de USA',
		},
		{
			codigo: 'COL',
			texto: 'Peso Colombiano',
		},
		{
			codigo: 'EUR',
			texto: 'Euro',
		},
		{
			codigo: 'GBP',
			texto: 'Libra Esterlina',
		},
	])
	const cotizacion = ref({})
	const cargando = ref(false)

	onMounted(() => {
		const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
		fetch(url)
			.then(respuesta => respuesta.json())
			.then(({ Data }) => {
				criptomonedas.value = Data.map(({ CoinInfo }) => {
					const { FullName, Name } = CoinInfo
					return {
						FullName,
						Name,
					}
				})
			})
	})

	const obtenerCotizacion = async cotizar => {
		cargando.value = true
		cotizacion.value = {}
		try {
			const { moneda, criptomoneda } = cotizar
			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

			const respuesta = await fetch(url)
			const data = await respuesta.json()
			cotizacion.value = data.DISPLAY[criptomoneda][moneda]
		} catch (error) {
			throw new Error(error)
		} finally {
			cargando.value = false
		}
	}

	const mostrarCotizacion = computed(() => Object.values(cotizacion.value).length > 0)

	return {
		monedas,
		criptomonedas,
		cargando,
		cotizacion,
		obtenerCotizacion,
		mostrarCotizacion,
	}
}
