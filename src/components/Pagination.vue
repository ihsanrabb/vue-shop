<template>
    <div v-if="totalPages() > 0" class="pagination-wrapper">
        <!-- <span v-if="showPreviousLink()" class="pagination-btn" @click="updatePage(currentPage - 1)"> < </span>
        {{ currentPage + 1 }} of {{ totalPages() }}
        <span v-if="showNextLink()" class="pagination-btn" @click="updatePage(currentPage + 1)"> > </span> -->
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link pagination-btn" @click="updatePage(currentPage - 1)">Previous</a></li>
                <li class="page-item disabled"><a class="page-link">{{ currentPage + 1 }} of {{ totalPages() }}</a></li>
                <li class="page-item"><a class="page-link pagination-btn" @click="updatePage(currentPage + 1)">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "pagination",
    props: ['products', 'currentPage', 'pageSize'],
    methods: {
        updatePage(pageNumber) {
            this.$emit('page:update', pageNumber);
        },
        totalPages() {
            return Math.ceil(this.products.length / this.pageSize);
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
    padding-top: 0.7em;
    .pagination-btn {
        color: blue;
        // padding-left: 0.7em;
        // padding-right: 0.7em;
        // font-size: 20px;
        cursor: pointer;
    }
}

</style>