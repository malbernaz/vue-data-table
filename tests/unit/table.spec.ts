import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import { DataTable, WithSearch, ColumnDef, Row } from "@/components/DataTable";
import fs from "fs";
import path from "path";

const csv = fs.readFileSync(path.join(__dirname, "payment-data.json"), "utf-8");

let rows: Row[] = JSON.parse(csv);

describe("DataTable", () => {
  it("should throw if required props are not provided", () => {
    expect(() => shallowMount(DataTable)).toThrow();
  });

  it("should render given required props", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    wrapper.findAll("th").wrappers.forEach((th, i) => {
      expect(th.text()).toBe(defs[i].name);
    });

    expect(wrapper.findAll("tr").wrappers.length - 1).toBe(rows.length);
  });

  it("should not render a column with display set to false", () => {
    let defs: ColumnDef[] = [
      { name: "id", display: false },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    expect(wrapper.find("th:first-child").text()).not.toBe("id");

    let [_, ...dataRows] = wrapper.findAll("tr").wrappers;

    dataRows.forEach(row => {
      expect(row.findAll("td").wrappers.length).toBe(defs.length - 1);
    });
  });

  it("should align items properly if specified", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount", align: "right" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    let [, ...dataRows] = wrapper.findAll("tr").wrappers;

    dataRows.forEach(row => {
      expect(row.find("td:last-child").element.style.textAlign).toBe("right");
    });
  });

  it("should preserve width given a width prop for a definition", () => {
    let defs: ColumnDef[] = [
      { name: "id", width: "20%" },
      { name: "name", width: "20%" },
      { name: "description", width: "40%" },
      { name: "date", width: "20%" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    wrapper.findAll("th").wrappers.forEach((col, i) => {
      if (defs[i].width) expect(col.element.style.width).toBe(defs[i].width);
    });
  });

  it("should sort rows by name given a compare function", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount", compare: (a: number, b: number) => a - b }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    let amounts = rows.map(row => row.amount);
    let sortedamounts = amounts.slice().sort((a: number, b: number) => a - b);
    let reverseSortedamounts = amounts.slice().sort((a: number, b: number) => b - a);

    let [, ...dataRows] = wrapper.findAll("tr").wrappers;

    // user clicks column
    wrapper.find("th:last-child button").element.click();

    // renders rows in order
    dataRows.forEach((row, i) => {
      expect(row.find("td:last-child").text()).toBe(sortedamounts[i].toString());
    });

    // user clicks column for the second time
    wrapper.find("th:last-child button").element.click();

    // renders rows in reverse order
    dataRows.forEach((row, i) => {
      expect(row.find("td:last-child").text()).toBe(reverseSortedamounts[i].toString());
    });
  });

  it("should sort rows alphabetically if a compare function is not provided", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });
    let [, ...wrappers] = wrapper.findAll("tr").wrappers;

    let names = rows.map(row => row.name);
    let sortednames = names.slice().sort((a, b) => a.localeCompare(b));

    // user clicks name column
    wrapper.find("th:nth-child(2) button").element.click();

    // renders rows ordered by name alphabetically
    wrappers.forEach((row, i) => {
      expect(row.find("td:nth-child(2)").text()).toBe(sortednames[i]);
    });
  });

  it("should transform data given a transform function", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name", transform: (name: string) => `${name}!!` },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    let [, ...wrappers] = wrapper.findAll("tr").wrappers;

    wrappers.forEach(row => {
      expect(
        row
          .find("td:nth-child(2)")
          .text()
          .endsWith("!!")
      ).toBe(true);
    });
  });

  it("should execute onRowSelect in response to a row selection", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    const onRowSelect = jest.fn();

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows, onRowSelect } });
    let [, firstDataRow] = wrapper.findAll("tr").wrappers;

    // user clicks row
    firstDataRow.element.click();

    expect(onRowSelect).toHaveBeenCalled();
  });
});

describe("WithSearch", () => {
  it("should throw if required props are not provided", () => {
    expect(() => shallowMount(WithSearch)).toThrow();
  });

  it("should provide a search text", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    wrapper.setData({ search: "foo" });

    setTimeout(() => {
      expect(wrapper.find("input").text()).toBe("foo");
    });
  });

  it("should provide a filter", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    wrapper.setData({ filter: "name" });

    setTimeout(() => {
      expect(wrapper.find("select").text()).toBe("name");
    });
  });

  it("should provide a filter", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    wrapper.setData({ filter: "name" });

    setTimeout(() => {
      expect(wrapper.find("select").text()).toBe("name");
    });
  });

  it("should set filter to first def name if no defaultname is Provided", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    expect(wrapper.vm.$data.filter).toBe("id");
  });

  it("should set filter to defaultname", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows, defaultFilter: "name" } });

    expect(wrapper.vm.$data.filter).toBe("name");
  });

  it("should pass table props throw slot scope", () => {
    let defs: ColumnDef[] = [
      { name: "id" },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let TableWithWrapper = Vue.extend({
      render(createElement) {
        return createElement(WithSearch, {
          props: { defs, rows, defaultFilter: "name" },
          scopedSlots: {
            default: (props: any) => createElement(DataTable, { props })
          }
        });
      }
    });

    expect(() => mount(TableWithWrapper)).not.toThrow();
  });

  it("should filter data", () => {
    let defs: ColumnDef[] = [
      { name: "id", display: false },
      { name: "name" },
      { name: "description" },
      { name: "date" },
      { name: "amount" }
    ];

    let TableWithWrapper = Vue.extend({
      render(createElement) {
        return createElement(WithSearch, {
          props: { defs, rows, defaultFilter: "name" },
          scopedSlots: {
            default: (props: any) => createElement(DataTable, { props })
          }
        });
      }
    });

    let wrapper = mount(TableWithWrapper);

    let input = wrapper.find("input");
    // user sets search text to Aimee (first data row on payment-data.json)
    // @ts-ignore
    input.element.value = "aimee";
    input.trigger("input");

    let [, ...dataRows] = wrapper.findAll("tr").wrappers;

    expect(dataRows[0].find("td:nth-child(1)").text()).toBe("Aimee Davidson");
  });
});
