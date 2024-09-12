<script setup lang="ts">
definePageMeta({
  title: "Subscriptions",
  pageName: "admin.dashboard.home.posted-job",
  layout: "dashboard",
});
</script>

<template>
  <div>
    <div class="p-4 bg-white w-full rounded-12 space-y-4">
      <div class="flex justify-between items-center">
        <div class="flex gap-x-4 items-center">
          <img src="/assets//images/sportify.png" alt="" />
          <div>
            <h1 class="text-xl font-black">Spotify</h1>
            <p class="text-xs">spotify@gmail.com</p>
          </div>
        </div>

        <div class="relative -top-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8383 9.08101C14.8383 9.48802 14.6935 9.83632 14.4039 10.1259C14.1138 10.416 13.7652 10.561 13.3582 10.561C12.9512 10.561 12.6027 10.416 12.3126 10.1259C12.023 9.83632 11.8782 9.48802 11.8782 9.08101C11.8782 8.674 12.023 8.32546 12.3126 8.03537C12.6027 7.74578 12.9512 7.60098 13.3582 7.60098C13.7652 7.60098 14.1138 7.74578 14.4039 8.03537C14.6935 8.32546 14.8383 8.674 14.8383 9.08101ZM10.3982 9.08101C10.3982 9.48802 10.2531 9.83632 9.96305 10.1259C9.67346 10.416 9.32516 10.561 8.91815 10.561C8.51114 10.561 8.1626 10.416 7.87251 10.1259C7.58292 9.83632 7.43812 9.48802 7.43812 9.08101C7.43812 8.674 7.58292 8.32546 7.87251 8.03537C8.1626 7.74578 8.51114 7.60098 8.91815 7.60098C9.32516 7.60098 9.67346 7.74578 9.96305 8.03537C10.2531 8.32546 10.3982 8.674 10.3982 9.08101ZM5.9581 9.08101C5.9581 9.48802 5.81306 9.83632 5.52297 10.1259C5.23338 10.416 4.88508 10.561 4.47807 10.561C4.07107 10.561 3.72277 10.416 3.43317 10.1259C3.14309 9.83632 2.99805 9.48802 2.99805 9.08101C2.99805 8.674 3.14309 8.32546 3.43317 8.03537C3.72277 7.74578 4.07107 7.60098 4.47807 7.60098C4.88508 7.60098 5.23338 7.74578 5.52297 8.03537C5.81306 8.32546 5.9581 8.674 5.9581 9.08101Z"
              fill="#1D2433"
              fill-opacity="0.8"
            />
          </svg>
        </div>
      </div>

      <!-- details  -->
      <div class="divide-x-2 gap-x-6 flex">
        <div class="space-y-3">
          <h1 class="text-xs">Reg. Date</h1>
          <p class="text-xs">01 May 2024</p>
        </div>
        <div class="space-y-3 pl-6">
          <h1 class="text-xs">Phone number</h1>
          <p class="text-xs">+234123456789</p>
        </div>
        <div class="space-y-3 pl-6">
          <h1 class="text-xs">Country</h1>
          <p class="text-xs">Nigeria</p>
        </div>
        <div class="space-y-3 pl-6">
          <h1 class="text-xs">Job postings</h1>
          <p class="text-xs">3</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="p-4 bg-white w-full rounded-12 space-y-4 my-5">
      <h1 class="font-black text-base">Posted jobs: 3</h1>
      <p class="text-xs">An overview of jobs posted</p>
      <!-- tabe -->
      <div class="bg-white rounded-10 h-full w-full my-4">
        <!-- table custom -->
        <nav
          class="mt-4 h-10 flex items-center px-2 bg-westside-100 rounded-t-8"
        >
          <ul class="flex justify-between items-start w-full">
            <li class="text-xs font-black flex gap-x-2 items-center">
              Unique ID
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 4L5.5 7H12.5L8.5 4Z" fill="#1E293B" />
                <path d="M8.5 13L5.5 10H12.5L8.5 13Z" fill="#1E293B" />
              </svg>
            </li>

            <li class="text-xs font-black flex gap-x-2 items-center">
              Position
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 4L5.5 7H12.5L8.5 4Z" fill="#1E293B" />
                <path d="M8.5 13L5.5 10H12.5L8.5 13Z" fill="#1E293B" />
              </svg>
            </li>
            <li class="text-xs font-black flex gap-x-2 pl-6 items-center">
              Location
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 4L5.5 7H12.5L8.5 4Z" fill="#1E293B" />
                <path d="M8.5 13L5.5 10H12.5L8.5 13Z" fill="#1E293B" />
              </svg>
            </li>
            <li
              class="text-xs font-black flex gap-x-2 relative left-5 items-center"
            >
              Date
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 4L5.5 7H12.5L8.5 4Z" fill="#1E293B" />
                <path d="M8.5 13L5.5 10H12.5L8.5 13Z" fill="#1E293B" />
              </svg>
            </li>

            <li
              class="text-xs font-black pl-10 flex gap-x-2 relative items-center"
            >
              Duration
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 4L5.5 7H12.5L8.5 4Z" fill="#1E293B" />
                <path d="M8.5 13L5.5 10H12.5L8.5 13Z" fill="#1E293B" />
              </svg>
            </li>

            <li class="text-xs font-black flex gap-x-2 relative items-center">
              No of applicants
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 4L5.5 7H12.5L8.5 4Z" fill="#1E293B" />
                <path d="M8.5 13L5.5 10H12.5L8.5 13Z" fill="#1E293B" />
              </svg>
            </li>

            <li
              class="text-xs font-black flex gap-x-2 relative right-2 items-center"
            >
              Status
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 4L5.5 7H12.5L8.5 4Z" fill="#1E293B" />
                <path d="M8.5 13L5.5 10H12.5L8.5 13Z" fill="#1E293B" />
              </svg>
            </li>
          </ul>
        </nav>
        <!--  -->
        <div class="overflow-x-auto">
          <table
            class="w-full mt-2 table table-xs table-pin-rows table-pin-cols"
          >
            <!-- <thead class="bg-black-500 text-white"></thead> -->
            <tbody class="">
              <tr class="h-10">
                <td class="text-xs">123456</td>
                <td
                  class="text-xs flex items-center pt-2 gap-x-1 relative left-8"
                >
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M0 4.5C0 2.29086 1.79086 0.5 4 0.5H18C20.2091 0.5 22 2.29086 22 4.5V18.5C22 20.7091 20.2091 22.5 18 22.5H4C1.79086 22.5 0 20.7091 0 18.5V4.5Z"
                      fill="url(#pattern0_548_16253)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_548_16253"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_548_16253"
                          transform="scale(0.03125)"
                        />
                      </pattern>
                      <image
                        id="image0_548_16253"
                        width="32"
                        height="32"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACLElEQVRIDWNgtCqkKWKgqemMVoWjFhAM4dEgIi2IGCwLGSwKoMiyAKKZwSyfwTiXwTSPAZZjGCzBamAKoMqsYHphyqDicCcwWBYyWxXy2RVz2xbz2RWzWhcymOYzyKcYB9Vn187xSOxkkEsBGW1ZwG1TxG9XzGVTxACzg8GqkMGykN+uWMCuBOQ+JDsQkcxgmFPfu/w/DEyat0XKuez+4xcwgf/3Hj5n0M1iUEs/e+nO////j525zqCRAXWmaV5wVh9EJYNeNtxilIzGYJKXUDL1wtV7Hz59+f///6ZdJ//////7z5/jZ6+/ePUOonn5hoMMwglHT1/7////vqMXkS3wT++BWqCLwwKQbSZ5DKyxx89ehyjtnrmeQTyRQTWdgSH6ys2H////v//oBQNDDPkWgOxQSz914eb///+Xrj/AIJsMCU0GvezuGev//////OU7BoZoiAV7j15kUE+HxAqDca5fGhE+QLZg1ebDDNqZ0CDWz+6Ytu7////PXr6FW7Dn8AUGhVRQAjPOZdDN8kzuIhxEeCzoxLAAYhwmyYAnDgaXBbsPn2eQSmbQzwYhzUz3xE4qBxGVIxkzDsjJByTFAfkWXL5+/////xt3nkBOpv1zNv3////9xy8MDNFkFhXQJA8uzkAFFpgBEyyEl6BQKTQFoMIOWsTiLOwgZoFCCaYULgIWBJfG4OITuwKCxTWycVRkI4prKhqKbNSoBcihgZU9GkRYgwVZEACaY95j2RbRwAAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                  Sales Rep
                </td>
                <td class="text-xs relative right-14">Lagos</td>
                <td class="text-xs relative left-6">2024/05/20</td>
                <td class="text-xs">6 Days</td>
                <td class="text-xs text-right">16</td>
                <td class="text-right">
                  <button
                    class="bg-success-400 text-xs text-white px-4 py-2 rounded-20"
                  >
                    Completed
                  </button>
                </td>
              </tr>
              <!--  -->
              <tr class="h-10 bg-westside-50">
                <td class="text-xs">123456</td>
                <td class="text-xs flex items-center gap-x-1 relative left-8">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M0 4.5C0 2.29086 1.79086 0.5 4 0.5H18C20.2091 0.5 22 2.29086 22 4.5V18.5C22 20.7091 20.2091 22.5 18 22.5H4C1.79086 22.5 0 20.7091 0 18.5V4.5Z"
                      fill="url(#pattern0_548_16253)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_548_16253"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_548_16253"
                          transform="scale(0.03125)"
                        />
                      </pattern>
                      <image
                        id="image0_548_16253"
                        width="32"
                        height="32"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACLElEQVRIDWNgtCqkKWKgqemMVoWjFhAM4dEgIi2IGCwLGSwKoMiyAKKZwSyfwTiXwTSPAZZjGCzBamAKoMqsYHphyqDicCcwWBYyWxXy2RVz2xbz2RWzWhcymOYzyKcYB9Vn187xSOxkkEsBGW1ZwG1TxG9XzGVTxACzg8GqkMGykN+uWMCuBOQ+JDsQkcxgmFPfu/w/DEyat0XKuez+4xcwgf/3Hj5n0M1iUEs/e+nO////j525zqCRAXWmaV5wVh9EJYNeNtxilIzGYJKXUDL1wtV7Hz59+f///6ZdJ//////7z5/jZ6+/ePUOonn5hoMMwglHT1/7////vqMXkS3wT++BWqCLwwKQbSZ5DKyxx89ehyjtnrmeQTyRQTWdgSH6ys2H////v//oBQNDDPkWgOxQSz914eb///+Xrj/AIJsMCU0GvezuGev//////OU7BoZoiAV7j15kUE+HxAqDca5fGhE+QLZg1ebDDNqZ0CDWz+6Ytu7////PXr6FW7Dn8AUGhVRQAjPOZdDN8kzuIhxEeCzoxLAAYhwmyYAnDgaXBbsPn2eQSmbQzwYhzUz3xE4qBxGVIxkzDsjJByTFAfkWXL5+/////xt3nkBOpv1zNv3////9xy8MDNFkFhXQJA8uzkAFFpgBEyyEl6BQKTQFoMIOWsTiLOwgZoFCCaYULgIWBJfG4OITuwKCxTWycVRkI4prKhqKbNSoBcihgZU9GkRYgwVZEACaY95j2RbRwAAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                  UI/UX Designer
                </td>
                <td class="text-xs relative right-14">Abuja</td>
                <td class="text-xs relative left-6">2024/05/20</td>
                <td class="text-xs">4 Days</td>
                <td class="text-xs text-right">34</td>
                <td class="text-right">
                  <button
                    class="bg-westside-400 text-xs text-white px-4 py-2 rounded-20"
                  >
                    In Progress
                  </button>
                </td>
              </tr>
              <!--  -->
              <tr class="h-10">
                <td class="text-xs">123456</td>
                <td class="text-xs flex items-center gap-x-1 relative left-8">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M0 4.5C0 2.29086 1.79086 0.5 4 0.5H18C20.2091 0.5 22 2.29086 22 4.5V18.5C22 20.7091 20.2091 22.5 18 22.5H4C1.79086 22.5 0 20.7091 0 18.5V4.5Z"
                      fill="url(#pattern0_548_16253)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_548_16253"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_548_16253"
                          transform="scale(0.03125)"
                        />
                      </pattern>
                      <image
                        id="image0_548_16253"
                        width="32"
                        height="32"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACLElEQVRIDWNgtCqkKWKgqemMVoWjFhAM4dEgIi2IGCwLGSwKoMiyAKKZwSyfwTiXwTSPAZZjGCzBamAKoMqsYHphyqDicCcwWBYyWxXy2RVz2xbz2RWzWhcymOYzyKcYB9Vn187xSOxkkEsBGW1ZwG1TxG9XzGVTxACzg8GqkMGykN+uWMCuBOQ+JDsQkcxgmFPfu/w/DEyat0XKuez+4xcwgf/3Hj5n0M1iUEs/e+nO////j525zqCRAXWmaV5wVh9EJYNeNtxilIzGYJKXUDL1wtV7Hz59+f///6ZdJ//////7z5/jZ6+/ePUOonn5hoMMwglHT1/7////vqMXkS3wT++BWqCLwwKQbSZ5DKyxx89ehyjtnrmeQTyRQTWdgSH6ys2H////v//oBQNDDPkWgOxQSz914eb///+Xrj/AIJsMCU0GvezuGev//////OU7BoZoiAV7j15kUE+HxAqDca5fGhE+QLZg1ebDDNqZ0CDWz+6Ytu7////PXr6FW7Dn8AUGhVRQAjPOZdDN8kzuIhxEeCzoxLAAYhwmyYAnDgaXBbsPn2eQSmbQzwYhzUz3xE4qBxGVIxkzDsjJByTFAfkWXL5+/////xt3nkBOpv1zNv3////9xy8MDNFkFhXQJA8uzkAFFpgBEyyEl6BQKTQFoMIOWsTiLOwgZoFCCaYULgIWBJfG4OITuwKCxTWycVRkI4prKhqKbNSoBcihgZU9GkRYgwVZEACaY95j2RbRwAAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                  Manager
                </td>
                <td class="text-xs relative right-14">Kano</td>
                <td class="text-xs relative left-6">2024/05/20</td>
                <td class="text-xs">3 Days</td>
                <td class="text-xs text-right">367</td>
                <td class="text-right">
                  <button
                    class="bg-success-400 text-xs text-white px-4 py-2 rounded-20"
                  >
                    Completed
                  </button>
                </td>
              </tr>
              <!--  -->
              <tr class="h-10 bg-westside-50">
                <td class="text-xs">123456</td>
                <td class="text-xs flex items-center gap-x-1 relative left-8">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M0 4.5C0 2.29086 1.79086 0.5 4 0.5H18C20.2091 0.5 22 2.29086 22 4.5V18.5C22 20.7091 20.2091 22.5 18 22.5H4C1.79086 22.5 0 20.7091 0 18.5V4.5Z"
                      fill="url(#pattern0_548_16253)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_548_16253"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_548_16253"
                          transform="scale(0.03125)"
                        />
                      </pattern>
                      <image
                        id="image0_548_16253"
                        width="32"
                        height="32"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACLElEQVRIDWNgtCqkKWKgqemMVoWjFhAM4dEgIi2IGCwLGSwKoMiyAKKZwSyfwTiXwTSPAZZjGCzBamAKoMqsYHphyqDicCcwWBYyWxXy2RVz2xbz2RWzWhcymOYzyKcYB9Vn187xSOxkkEsBGW1ZwG1TxG9XzGVTxACzg8GqkMGykN+uWMCuBOQ+JDsQkcxgmFPfu/w/DEyat0XKuez+4xcwgf/3Hj5n0M1iUEs/e+nO////j525zqCRAXWmaV5wVh9EJYNeNtxilIzGYJKXUDL1wtV7Hz59+f///6ZdJ//////7z5/jZ6+/ePUOonn5hoMMwglHT1/7////vqMXkS3wT++BWqCLwwKQbSZ5DKyxx89ehyjtnrmeQTyRQTWdgSH6ys2H////v//oBQNDDPkWgOxQSz914eb///+Xrj/AIJsMCU0GvezuGev//////OU7BoZoiAV7j15kUE+HxAqDca5fGhE+QLZg1ebDDNqZ0CDWz+6Ytu7////PXr6FW7Dn8AUGhVRQAjPOZdDN8kzuIhxEeCzoxLAAYhwmyYAnDgaXBbsPn2eQSmbQzwYhzUz3xE4qBxGVIxkzDsjJByTFAfkWXL5+/////xt3nkBOpv1zNv3////9xy8MDNFkFhXQJA8uzkAFFpgBEyyEl6BQKTQFoMIOWsTiLOwgZoFCCaYULgIWBJfG4OITuwKCxTWycVRkI4prKhqKbNSoBcihgZU9GkRYgwVZEACaY95j2RbRwAAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                 HR Admin
                </td>
                <td class="text-xs relative right-14">Enugu</td>
                <td class="text-xs relative left-6">2024/05/20</td>
                <td class="text-xs">4 Days</td>
                <td class="text-xs text-right">34</td>
                <td class="text-right pr-6">
                  <button
                    class="bg-danger-400 text-xs text-white px-4 py-2 rounded-20"
                  >
                    Expired
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
