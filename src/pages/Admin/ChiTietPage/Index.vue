<template>
  <VRow justify="space-between" align="center">
    <VCol cols="7">
      <div class="d-flex align-center">
        <VBtn class="btn_back" icon>
          <VIcon icon="tabler-arrow-narrow-left" size="28"></VIcon>
        </VBtn>
        <div class="ml-5 title">Đăng ký cầu siêu</div>
      </div>
    </VCol>
    <VCol cols="5">
      <div class="d-flex justify-end">
        <VBtn color="#fff" class="btn_huy ml-3"> Hủy </VBtn>
        <VBtn color="#d27a12" class="btn_dangKy ml-3"> Đăng ký </VBtn>
      </div>
    </VCol>
  </VRow>
  <VRow>
    <VCol offset="2" cols="8">
      <div class="content">
        <Vcard>
          <VRow class="ma-2">
            <VCol cols="12">
              <div class="title_ChiTiet">Chi tiết đăng ký</div>
            </VCol>
            <VCol cols="12">
              <div class="info_DangKy">THÔNG TIN NGƯỜI ĐĂNG KÝ</div>
            </VCol>
            <VCol cols="3"> Họ tên: </VCol>
            <VCol cols="9"> Trần Thị Ngọc Ánh </VCol>
            <VCol cols="3"> Chức danh: </VCol>
            <VCol cols="3"> Đạo tràng trưởng </VCol>
            <VCol cols="3"> Điện thoại: </VCol>
            <VCol cols="3"> 0338968123 </VCol>
            <VCol cols="3"> Đạo tràng: </VCol>
            <VCol cols="9">
              Đạo tràng Thái Phổ Trần Nguyên Hãn, Bắc Giang - ĐT0001
            </VCol>
            <VCol cols="3"> Khối/tổ: </VCol>
            <VCol cols="9"> Tổ 1 </VCol>
            <VCol cols="12">
              <div class="info_DangKy">THÔNG TIN ĐĂNG KÝ</div>
            </VCol>
            <VCol cols="6">
              <label for="">Ngày diên ra sự kiện âm lịch</label>
              <AppTextField :disabled="true" class="hidden" />
            </VCol>
            <VCol cols="6"> </VCol>
            <VCol cols="6">
              <label for=""
                >Họ và tên Phật tử <span class="text-error">*</span></label
              >
              <AppSelect placeholder="Chọn phật tử" />
            </VCol>
            <VCol cols="6">
              <label for="">Số điện thoại</label>
              <AppTextField :disabled="true" class="hidden" />
            </VCol>
            <VCol cols="12">
              <label for="">Địa chỉ</label>
              <AppTextField :disabled="true" class="hidden" />
            </VCol>
            <VCol cols="12">
              <div class="title_vongLinh">Các vong linh trong vòng 49 ngày</div>
            </VCol>
            <VCol cols="12">
              <label for="">Họ và tên người mất</label>
              <AppTextField />
            </VCol>
            <VCol cols="4">
              <label for="">Ngày mất</label>
              <AppTextField />
            </VCol>
            <VCol cols="4">
              <label for="">Ngày mất âm lịch</label>
              <AppTextField :disabled="true" class="hidden" />
            </VCol>
            <VCol cols="3">
              <label for="">Thọ</label>
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for="">Địa chỉ an táng</label>
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <VIcon icon="tabler-plus"></VIcon>
              Thêm vong linh
            </VCol>
            <VCol cols="6">
              <label for="">Cùng đường</label>
              <AppTextField placeholder="Lựa chọn" />
            </VCol>
            <VCol cols="12">
              <div class="title_vongLinh">Các mục tâm linh bài số 8</div>
              <div class="luuY">
                Lưu ý không ghi các mục OGTC chung, riêng như viết mục VL bạch
                chư Tăng
              </div>
            </VCol>
            <VCol cols="12">
              <label for="">
                Cúng dường hồi hướng cho chư Thiên, chư Thần linh (chư Linh thần
                hộ trì) hợp duyên</label
              >
              <AppSelect placeholder="Lựa chọn" />
            </VCol>
            <VCol cols="6">
              <label for=""> VL gia tiên hợp duyên đã bạch thỉnh</label>
              <AppSelect placeholder="Lựa chọn" />
            </VCol>
            <VCol cols="6">
              <label for=""> VL trên đất hợp duyên đã bạch thỉnh</label>
              <AppSelect placeholder="Lựa chọn" />
            </VCol>
            <VCol cols="12">
              <label for=""> VL trên nghiệp</label>
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for="">
                VL OGTC cản trở chữa bệnh bằng các phương pháp của Cô CN (hát
                tán dương, các bài thuốc)
                <span class="text-error">*</span></label
              >
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for=""> Các mục vong linh khác</label>
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for=""> Cùng đường</label>
              <AppTextField placeholder="Lựa chọn" />
            </VCol>
            <VCol cols="12">
              <div class="title_vongLinh">Các mục vong linh khác</div>
            </VCol>
            <VCol cols="12">
              <label for=""> Vong linh gia tiên họ</label>
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for=""> Vong linh có tên</label>
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for=""> Vong linh trên các nghiệp, hiện tượng</label>
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for="">
                Vong linh phát sinh khác (giấc mơ, hiện tượng báo trên thân,
                bệnh đột xuất,...)</label
              >
              <AppTextField />
            </VCol>
            <VCol cols="12">
              <label for=""> Cúng dường</label>
              <AppSelect placeholder="Lựa chọn" />
            </VCol>
          </VRow>
        </Vcard>
      </div>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { ref } from "vue";
import avatar from "@images/avatars/default-avatar.png";
import { requiredValidator, lengthValidator } from "@validators";
import router from "@/router";
</script>

<style lang="scss" scoped>
.btn_back {
  color: #4b465c !important;
  background-color: #f7f6f4 !important;
  border: 1px solid #817d8d;
}
.title {
  font-size: 22px;
  font-weight: 600;
  color: #4b465c;
}
.btn_huy {
  color: #817d8d;
  border: 1px solid #817d8d;
}
.btn_dangKy {
  color: #fff;
  text-transform: inherit;
}

.content {
  background-color: #fff;
  .title_ChiTiet {
    font-size: 18px;
    font-weight: 600;
    color: #4b465c;
  }
  .info_DangKy {
    font-size: 14px;
    font-weight: 400;
    color: #817d8d;
  }
  .title_vongLinh {
    font-size: 15px;
    font-weight: 600;
    color: #817d8d;
  }
  .luuY {
    font-size: 13px;
    font-weight: 400;
    color: #a8aaae;
  }
  .hidden {
    background-color: #f1f0f2;
  }
}
</style>
