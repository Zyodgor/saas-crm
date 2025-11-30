<script setup lang="ts">
import { onMounted } from "vue";
import { supabase } from "@/supabase/client";

onMounted(async () => {
  try {
    const { data, error } = await supabase.from("test").select("*").limit(1);

    if (error) {
      console.log("❌ Supabase connection error:", error.message);
    } else {
      console.log("✅ Supabase connected successfully!", data);
    }
  } catch (err) {
    console.log("❌ Connection failed:", err);
  }
});
</script>

<template>
  <div class="test-connection">
    <p>Checking Supabase connection...</p>
  </div>
</template>