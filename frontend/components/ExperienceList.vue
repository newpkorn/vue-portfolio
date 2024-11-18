<script setup>
import { defineProps, defineEmits } from 'vue';

// กำหนด props ให้มี default ค่าหากไม่ส่งมา
const { experiences = [], canEdit, hasMoreExperiences, isExperienceVisible } = defineProps({
    experiences: {
        type: Array,
        default: () => [] // ค่า default ให้เป็น array ว่าง
    },
    canEdit: Boolean,
    hasMoreExperiences: Boolean,
    isExperienceVisible: Function,
});

defineEmits(['edit', 'more']);
</script>

<template>
    <h2 class="text-xl font-bold mb-3 flex justify-between">
        <span>Experiences</span>
        <BaseButton
            v-if="canEdit"
            size="small"
            variant="secondary"
            @click="$emit('edit')"
        >
            Edit
        </BaseButton>
    </h2>
    <!-- ตรวจสอบว่า experiences มีข้อมูล และไม่เป็น null -->
    <ol v-if="Array.isArray(experiences) && experiences.length > 0" class="space-y-6">
        <li v-for="(experience, index) in experiences" :key="experience.id">
            <div v-if="isExperienceVisible(index)">
                <ExperienceItem :experience="experience" />
            </div>
        </li>
    </ol>
    <span v-else class="text-grey">
        None
    </span>
    <BaseButton
        v-if="hasMoreExperiences"
        @click="$emit('more')"
        type="button"
        size="small"
        variant="secondary"
        class="block w-full mt-5"
    >
        Load More
    </BaseButton>
</template>
