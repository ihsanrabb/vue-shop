<template>
    <div v-if="totalPages() > 0" class="pagination-wrapper">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{disabled: !showPreviousLink()}"><a class="page-link pagination-btn" @click="updatePage(currentPage - 1)">Previous</a></li>
                <li class="page-item disabled"><a class="page-link">{{ currentPage + 1 }} of {{ totalPages() }}</a></li>
                <li class="page-item" :class="{disabled: !showNextLink()}"><a class="page-link pagination-btn" @click="updatePage(currentPage + 1)">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "pagination",
    props: ['data', 'currentPage', 'pageSize'],
    methods: {
        updatePage(pageNumber) {
            this.$emit('page:update', pageNumber);
        },
        totalPages() {
            return Math.ceil(this.data.length / this.pageSize);
        },
        showPreviousLink() {
            return this.currentPage == 0 ? false : true
        },
        showNextLink() {
            return this.currentPage == (this.totalPages() - 1) ? false : true
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination-wrapper {
    padding-top: 1em;
    .pagination-btn {
        color: blue;
        cursor: pointer;
    }
}

</style>