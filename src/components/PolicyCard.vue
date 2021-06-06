<template>
    <section class="container">
        <h1 class="header">Your Policies</h1>
        <div class="loader" v-if="loading"></div>
        <template v-else>
            <template v-if="policies.length > 0">
                <div
                    class="card"
                    :class="{ 'card--shadow': policy.isActive }"
                    v-for="(policy, index) in policies"
                    :key="index"
                >
                    <div class="card-info flex-grow-1">
                        <div class="card-info-main">
                            <div class="card-info-main-text flex-grow-1">
                                <button
                                    class="card-info-btn display-desktop-and-table"
                                    :class="{ active: policy.isActive }"
                                    @click="toggleCard(policy)"
                                >
                                    <img
                                        src="../assets/icon-chevronright.svg"
                                        alt="click-btn-svg"
                                    />
                                </button>
                                <div class="flex-column">
                                    <h2 class="card-info-trip">
                                        {{ policy.title }}
                                    </h2>
                                    <div class="card-info-cover">
                                        <h4>{{ policy.id }}</h4>
                                        <div class="divider-col"></div>
                                        <h4>
                                            {{ policy.description }}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div class="card-logo display-tablet">
                                <img
                                    :src="policy.partner.logo"
                                    alt="policy.partner.name"
                                />
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="card-info-secondary">
                            <div class="display-desktop-and-table-flex">
                                <!-- Payment Date -->
                                <div class="card-info-details">
                                    <h3>
                                        {{ covertTime(policy.payment_date) }}
                                    </h3>
                                    <h5>Payment date</h5>
                                </div>
                                <!-- Coverage Dates -->
                                <div class="card-info-details">
                                    <h3>
                                        {{
                                            covertTime(
                                                policy.coverage_start_date
                                            )
                                        }}
                                        <template
                                            v-if="policy.coverage_end_date"
                                            >to
                                            {{
                                                covertTime(
                                                    policy.coverage_end_date
                                                )
                                            }}</template
                                        >
                                    </h3>
                                    <div class="flex-space-between">
                                        <h5 class="card-info-coverage">
                                            Coverage dates
                                        </h5>
                                        <div
                                            class="status-line"
                                            v-if="policy.status == 'active'"
                                        >
                                            <h4 class="status">Active</h4>
                                            <svg height="8" width="8">
                                                <circle
                                                    cx="4"
                                                    cy="4"
                                                    r="4"
                                                    fill="#00A082"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            class="status-line inactive"
                                            v-else
                                        >
                                            <h4 class="status">Expired</h4>
                                            <svg height="8" width="8">
                                                <circle
                                                    cx="4"
                                                    cy="4"
                                                    r="4"
                                                    fill="#FF3200"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <!-- Price -->
                                <div class="card-info-details">
                                    <h3>{{ policy.premium_formatted }}</h3>
                                    <h5>Price/Premium</h5>
                                </div>
                                <!-- Renewal -->
                                <div
                                    class="card-info-details"
                                    v-if="policy.renewal"
                                >
                                    <h3>{{ policy.renewal }}</h3>
                                    <h5>Renewal</h5>
                                </div>
                            </div>
                            <div class="flex-grow-1 display-mobile">
                                <div class="card-info-details">
                                    <h3>
                                        {{
                                            covertTime(
                                                policy.coverage_start_date
                                            )
                                        }}
                                        <template
                                            v-if="policy.coverage_end_date"
                                            >to
                                            {{
                                                covertTime(
                                                    policy.coverage_end_date
                                                )
                                            }}</template
                                        >
                                    </h3>
                                    <div class="display-flex">
                                        <h5 class="card-info-coverage">
                                            Coverage dates
                                        </h5>
                                        <div
                                            class="status-line"
                                            v-if="policy.status == 'active'"
                                        >
                                            <h4 class="status">Active</h4>
                                            <svg height="8" width="8">
                                                <circle
                                                    cx="4"
                                                    cy="4"
                                                    r="4"
                                                    fill="#00A082"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            class="status-line inactive"
                                            v-else
                                        >
                                            <h4 class="status">Expired</h4>
                                            <svg height="8" width="8">
                                                <circle
                                                    cx="4"
                                                    cy="4"
                                                    r="4"
                                                    fill="#FF3200"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-logo display-mobile">
                                <img
                                    :src="policy.partner.logo"
                                    alt="policy.partner.name"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="card-logo display-desktop">
                        <img
                            :src="policy.partner.logo"
                            alt="policy.partner.name"
                        />
                    </div>
                </div>
            </template>
            <template v-else>
                <h3>
                    Can not fetch the data at this time, please check your
                    network or try again later.
                </h3>
            </template>
        </template>
    </section>
</template>

<style lang="scss">
@import "../styles/main.scss";
@import "../styles/components/policycard.scss";
</style>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import covertTime from "../common/helper";

Vue.use(VueAxios, axios);

export default {
    data() {
        return {
            loading: false,
            policies: [],
            selectCards: new Map(),
            activeIndex: undefined,
        };
    },
    mounted() {
        this.getPolicy();
    },
    methods: {
        getPolicy() {
            this.loading = true;
            const requestUrl =
                "https://7946a218-d225-4d0e-80ac-450bbc9713a0.mock.pstmn.io/booking";
            Vue.axios
                .get(requestUrl)
                .then((response) => {
                    if (response.data && response.data.policies) {
                        response.data.policies.forEach(function (element) {
                            element.isActive = false;
                        });
                        this.policies = response.data.policies;
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error.message);
                    this.loading = false;
                });
        },
        toggleCard(policy) {
            policy.isActive = !policy.isActive;
        },
        covertTime,
    },
};
</script>
