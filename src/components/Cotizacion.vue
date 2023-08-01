<script setup>
defineProps({
    cotizacion: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="contenedor-resultado">
        <h2>Cotización</h2>
        <div class="resultado">
            <img :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" alt="Imagen cripto">
            <div>
                <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
                <p>El precio más alto del dÍa: <span>{{ cotizacion.HIGHDAY }}</span></p>
                <p>El precio más bajo del dÍa: <span>{{ cotizacion.LOWDAY }}</span></p>
                <p>Variacíon en la últimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }} %</span></p>
                <p>Última actualizacíon: <span>{{ cotizacion.LASTUPDATE }}</span></p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>