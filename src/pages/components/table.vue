<script setup lang="ts">
import { computed } from 'vue'
import type { PropDoc } from '../../components/ComponentDocs.vue'

const invoices = [
  { id: 1, invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: 2, invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: 3, invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: 4, invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { id: 5, invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
  { id: 6, invoice: "INV006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
  { id: 7, invoice: "INV007", status: "Unpaid", method: "Credit Card", amount: "$300.00" },
];

const totalAmount = computed(() => {
  const total = invoices.reduce((sum, invoice) => {
    return sum + parseFloat(invoice.amount.replace("$", "").replace(",", ""));
  }, 0);
  return `$${total.toFixed(2)}`;
});

const tableSourceCode = `<template>
  <div class="rounded-md border">
    <ui-table>
      <ui-table-caption>A list of invoices</ui-table-caption>
      
      <ui-table-header>
        <ui-table-row>
          <ui-table-head>Invoice</ui-table-head>
          <ui-table-head>Status</ui-table-head>
          <ui-table-head>Method</ui-table-head>
          <ui-table-head class="text-right">Amount</ui-table-head>
        </ui-table-row>
      </ui-table-header>
      
      <ui-table-body>
        <ui-table-row v-for="invoice in invoices" :key="invoice.id">
          <ui-table-cell>{{ invoice.invoice }}</ui-table-cell>
          <ui-table-cell>{{ invoice.status }}</ui-table-cell>
          <ui-table-cell>{{ invoice.method }}</ui-table-cell>
          <ui-table-cell class="text-right">{{ invoice.amount }}</ui-table-cell>
        </ui-table-row>
      </ui-table-body>
      
      <ui-table-footer>
        <ui-table-row>
          <ui-table-cell colspan="3">Total</ui-table-cell>
          <ui-table-cell class="text-right">$2,250.00</ui-table-cell>
        </ui-table-row>
      </ui-table-footer>
    </ui-table>
  </div>
</template>`

const tableProps: PropDoc[] = [
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes for the table'
  }
]
</script>

<template>
  <component-section id="table" title="Table" description="A responsive table component for displaying data."
    :source-code="tableSourceCode" :props-docs="tableProps">
    <div class="rounded-md border">
      <ui-table>
        <ui-table-caption>A list of your recent invoices.</ui-table-caption>
        <ui-table-header>
          <ui-table-row>
            <ui-table-head class="w-[100px]">Invoice</ui-table-head>
            <ui-table-head>Status</ui-table-head>
            <ui-table-head>Method</ui-table-head>
            <ui-table-head class="text-right">Amount</ui-table-head>
          </ui-table-row>
        </ui-table-header>
        <ui-table-body>
          <ui-table-row v-for="invoice in invoices" :key="invoice.id">
            <ui-table-cell class="font-medium">{{ invoice.invoice }}</ui-table-cell>
            <ui-table-cell>{{ invoice.status }}</ui-table-cell>
            <ui-table-cell>{{ invoice.method }}</ui-table-cell>
            <ui-table-cell class="text-right">{{ invoice.amount }}</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
        <ui-table-footer>
          <ui-table-row>
            <ui-table-cell colspan="3">Total</ui-table-cell>
            <ui-table-cell class="text-right font-medium">
              {{ totalAmount }}
            </ui-table-cell>
          </ui-table-row>
        </ui-table-footer>
      </ui-table>
    </div>
  </component-section>
</template>
