<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import { avatarText, convertDate, convertDateTime, convertFloat, convertInt } from '@/@core/utils/formatters'

const userList = ref<any[]>([
  {
    id: 1,
    fullName: 'Minh Nghê Ngọc',
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
    email: 'minhnn@ltsgroup.tech',
    startDate: new Date('1991/12/19'),
    activeDate: new Date(1991, 11, 19, 13, 23, 1),
    salary: 1234567.892,
    totalWorkedHours: 31233,
    status: 1,
    child: [{
      id: 11,
      fullName: 'Minh Nghê Ngọc',
      longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
      email: 'minhnn@ltsgroup.tech',
      startDate: new Date('1991/12/19'),
      activeDate: new Date(1991, 11, 19, 13, 23, 1),
      salary: 1234567.892,
      totalWorkedHours: 31233,
      status: 1,
    }, {
      id: 12,
      fullName: 'Minh Nghê Ngọc',
      longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
      email: 'minhnn@ltsgroup.tech',
      startDate: new Date('1991/12/19'),
      activeDate: new Date(1991, 11, 19, 13, 23, 1),
      salary: 1234567.892,
      totalWorkedHours: 31233,
      status: 1,
      child: [{
        id: 121,
        fullName: 'Minh Nghê Ngọc',
        longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
        email: 'minhnn@ltsgroup.tech',
        startDate: new Date('1991/12/19'),
        activeDate: new Date(1991, 11, 19, 13, 23, 1),
        salary: 1234567.892,
        totalWorkedHours: 31233,
        status: 1,
      }, {
        id: 122,
        fullName: 'Minh Nghê Ngọc',
        longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
        email: 'minhnn@ltsgroup.tech',
        startDate: new Date('1991/12/19'),
        activeDate: new Date(1991, 11, 19, 13, 23, 1),
        salary: 1234567.892,
        totalWorkedHours: 31233,
        status: 1,
      },]
    },]
  },
  {
    id: 2,
    fullName: 'Minh Nghê Ngọc',
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
    email: 'minhnn@ltsgroup.tech',
    startDate: new Date('1991/12/19'),
    activeDate: new Date(1991, 11, 19, 13, 23, 1),
    salary: 1234567.892,
    totalWorkedHours: 31233,
    status: 1,
  },
  {
    id: 3,
    fullName: 'Minh Nghê Ngọc',
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
    email: 'minhnn@ltsgroup.tech',
    startDate: new Date('1991/12/19'),
    activeDate: new Date(1991, 11, 19, 13, 23, 1),
    salary: 1234567.892,
    totalWorkedHours: 31233,
    status: 1,
  },
  {
    id: 4,
    fullName: 'Minh Nghê Ngọc',
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet erat ultrices metus hendrerit porta. Pellentesque facilisis augue non ultrices elementum. Praesent fermentum risus id enim aliquet suscipit. Mauris lacinia, nunc id congue auctor, dui sem faucibus augue, ac imperdiet sapien nibh quis augue. Proin cursus purus id lobortis rutrum.',
    email: 'minhnn@ltsgroup.tech',
    startDate: new Date('1991/12/19'),
    activeDate: new Date(1991, 11, 19, 13, 23, 1),
    salary: 1234567.892,
    totalWorkedHours: 31233,
    status: 1,
  },
])
const options = ref({ page: 1, itemsPerPage: 10, sortBy: [''], sortDesc: [false] })
const searchText = ref('')
const showDialog = ref(false)

// headers
const headers = [
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'LONG TEXT', key: 'longText' },
  { title: 'DATE', key: 'startDate' },
  { title: 'LAST ACTIVE DATE', key: 'activeDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'HOURS', key: 'totalWorkedHours' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}

onBeforeMount(() => {
  userList.value = userList.value.map(item => {
    return {
      ...item,
      startDate: convertDate(item.startDate),
      activeDate: convertDateTime(item.activeDate),
      salary: convertFloat(item.salary),
      totalWorkedHours: convertInt(item.totalWorkedHours)
    }
  })
})
</script>

<template>
  <v-card>
    <VDataTable
      ref="table"
      expand-on-click
      :headers="headers"
      :items="userList"
      :items-per-page="options.itemsPerPage"
      :page="options.page"
      :sortable="false"
      @update:options="options = $event"
    >

      <template #top="config">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols=2>
                  <v-combobox
                    v-model="options.itemsPerPage"
                    variant="outlined"
                    :items="[10, 20, 50, 100]"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row
                justify="end"
                align="center"
              >
                <v-col cols="6">
                  <v-text-field
                    v-model="searchText"
                    placeholder="Search"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                    variant="tonal"
                    prepend-icon="mdi-plus"
                  >
                    Thêm mới
                  </v-btn>
                </v-col>
                <v-col cols="1">
                  <v-icon>
                  mdi-filter
                  </v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <!-- full name -->
      <template #item.fullName="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            size="32"
            :color="item.raw.avatar ? '' : 'primary'"
            :class="item.raw.avatar ? '' : 'v-avatar-light-bg primary--text'"
            :variant="!item.raw.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.raw.avatar"
              :src="item.raw.avatar"
            />
            <span v-else>{{ avatarText(item.raw.fullName) }}</span>
          </VAvatar>
          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text--primary text-truncate">{{ item.raw.fullName }}</span>
            <small>{{ item.raw.post }}</small>
          </div>
        </div>
      </template>

      <template #item.longText="{ item }">
        <span class="d-block text-truncate" style="max-width: 130px; color: 115,103,240">{{ item.raw.longText }}</span>
      </template>

      <template #item.status="{ item }">
        <VChip
          :color="'#009278'"
          class="font-weight-medium"
          size="small"
        >
          {{ resolveStatusVariant(item.raw.status).text }}
        </VChip>
      </template>

      <template #item.actions="{ item }">
        <v-icon
        >
          mdi-pencil
        </v-icon>
        <v-icon
        >
          mdi-delete
        </v-icon>
      </template>

      <template #bottom>
        <VCardText class="pt-2">
          <VRow justify="end">
            <VCol
              lg="10"
              cols="9"
              class="d-flex justify-end"
            >
              <VPagination
                v-model="options.page"
                total-visible="5"
                :length="Math.ceil(userList.length / options.itemsPerPage)"
              />
            </VCol>
          </VRow>
        </VCardText>
      </template>
    </VDataTable>
    <v-dialog
      v-model="showDialog"
    ></v-dialog>
  </v-card>

</template>
