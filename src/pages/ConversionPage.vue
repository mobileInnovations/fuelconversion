<script setup>
import { ref } from "vue";
import { useConvertStore } from "@/stores/convert";
import AlertComponent from "@/components/AlertComponent";

const store = useConvertStore();

const loading = ref(false);
const master = ref(null);
const fleet = ref(null);
const vehicleField = ref("vehicleNumber");

const submit = async () => {
  loading.value = true;
  try {
    const result = await store.convert(
      master.value,
      fleet.value,
      vehicleField.value,
    );
    console.log("Conversion result:", result);
    loading.value = false;
    AlertComponent.success(
      "Success.",
      "The files have been converted and downloaded.",
    );
  } catch (error) {
    loading.value = false;
    console.error("Error occurred while converting:", error);

    AlertComponent.error(
      "An error occurred while converting the files.",
      error.message || error,
    );
  }
};
</script>

<template>
  <v-card class="container">
    <h1>Fuel Conversion</h1>
    <v-container class="main-conversion">
      <v-row>
        <v-col cols="2">Master file:</v-col>
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
          </div>
          <div class="text-file-example">
            ตัวอย่างไฟล์ Master file:
            <a href="public\docs\Master_file_example.xlsx" target="_blank"
              >Master file example</a
            >
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
            ไฟล์ที่ได้รับจากบริษัท
            เพื่อเป็นไฟล์ต้นฉบับสำหรับแปลงข้อมูลให้เป็นรูปแบบของโปรแกรม Fleet
            Expert Pro
          </div>
          <div class="text-file-example">
            ตัวอย่างไฟล์ Fuel Info:
            <a
              href="public\docs\Fuel_Info_example.xlsx"
              target="_blank"
              >Fuel Info example</a
            >
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
            :loading="loading"
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
