<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useConvertStore } from "@/stores/convert";

const { t } = useI18n();

const store = useConvertStore();

const master = ref(null);
const fleet = ref(null);
const vehicleField = ref("vehicleNumber");

const submit = async () => {
  await store.convert(master.value, fleet.value, vehicleField.value);
};
</script>

<template>
  <v-card class="container">
    <h1>Fuel Conversion</h1>

    <v-container class="main-conversion">
      <v-row>
        <v-col cols="2">Car Info:</v-col>
        <v-col cols="10">
          <v-file-input
            v-model="master"
            label="File input"
            variant="outlined"
            accept="application/vnd.ms-excel"
          ></v-file-input>
          <div class="text-description">
            ไฟล์ข้อมูลรถเป็นไฟล์ Excel
            ใช้สำหรับการจับคู่ระหว่างหมายเลขบัตรและหมายเลขรถที่อยู่ในระบบ Fleet
            Expert Professional
            <div class="text-file-example" @click="downloadExampleFile">
              {{ $t("example_file") }}
            </div>
          </div>
        </v-col>

        <v-col cols="2">Fuel Info:</v-col>
        <v-col cols="10">
          <v-file-input
            v-model="fleet"
            label="File input"
            variant="outlined"
          ></v-file-input>
          <div class="text-description">
            ไฟล์ที่ได้รับจากบริษัท ESSO
            เพื่อเป็นไฟล์ต้นฉบับสำหรับแปลงข้อมูลให้เป็นรูปแบบของโปรแกรม Fleet
            Expert Pro
            <div class="text-file-example" @click="downloadExampleFile">
              {{ $t("example_file") }}
            </div>
          </div>
        </v-col>

        <!------------------>
        <!----- Format ----->
        <!------------------>
        <v-col cols="2">Format output:</v-col>
        <v-col cols="10">
          <v-btn-toggle
            v-model="vehicleField"
            color="secondary"
            mandatory
            variant="outlined"
          >
            <v-btn value="vehicleNumber"> Vehicle Number </v-btn>

            <v-btn value="vehicleCode"> Vehicle Code </v-btn>
          </v-btn-toggle>

          <div class="text-description">
            Output format:
            <strong
              >Date, Vehicle Number/Vehicle Code, Type, Company Kind,
              Amount</strong
            >
          </div>
        </v-col>
        <v-col cols="12">
          <v-btn
            text="Convert"
            variant="tonal"
            color="primary"
            block
            :disabled="!master || !fleet"
            @click="submit"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 24px;
  margin: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text-description {
  color: #666666;
  font-size: 12px;
  font-weight: 400;
}
.text-file-example {
  color: #1e88e5;
  font-size: 12px;
  font-weight: 500;
}
</style>
