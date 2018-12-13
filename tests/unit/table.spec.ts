import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import { DataTable, WithSearch, Def } from "@/components/DataTable";
import csv from "./payment-data.json";

let [_, ...rows] = csv;

describe("DataTable", () => {
  it("should throw if required props are not provided", () => {
    expect(() => shallowMount(DataTable)).toThrow();
  });

  it("should render given required props", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    wrapper.findAll("th").wrappers.forEach((th, i) => {
      expect(th.text()).toBe(defs[i].field);
    });

    expect(wrapper.findAll("tr").wrappers.length - 1).toBe(rows.length);
  });

  it("should not render a column with display set to false", () => {
    let defs: Def[] = [
      { field: "ID", display: false },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    expect(wrapper.find("th:first-child").text()).not.toBe("ID");

    let [_, ...dataRows] = wrapper.findAll("tr").wrappers;

    dataRows.forEach(row => {
      expect(row.findAll("td").wrappers.length).toBe(defs.length - 1);
    });
  });

  it("should align items properly if specified", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount", align: "right" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    let [, ...dataRows] = wrapper.findAll("tr").wrappers;

    dataRows.forEach(row => {
      expect(row.find("td:last-child").element.style.textAlign).toBe("right");
    });
  });

  it("should preserve width given a width prop for a definition", () => {
    let defs: Def[] = [
      { field: "ID", width: "20%" },
      { field: "Name", width: "20%" },
      { field: "Description", width: "40%" },
      { field: "Date", width: "20%" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    wrapper.findAll("th").wrappers.forEach((col, i) => {
      expect(col.element.style.width).toBe(defs[i].width || "auto");
    });
  });

  it("should sort rows by field given a compare function", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount", sort: (a: string, b: string) => parseFloat(a) - parseFloat(b) }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });

    let [, ...amounts] = (csv as string[][]).map((row: string[]) => row[4]);
    let sortedAmounts = amounts
      .slice()
      .sort((a: string, b: string) => parseFloat(a) - parseFloat(b));
    let reverseSortedAmounts = amounts
      .slice()
      .sort((a: string, b: string) => parseFloat(b) - parseFloat(a));

    let [, ...wrappers] = wrapper.findAll("tr").wrappers;

    // user clicks column
    wrapper.find("th:last-child button").element.click();

    // renders rows in order
    wrappers.forEach((row, i) => {
      expect(row.find("td:last-child").text()).toBe(sortedAmounts[i]);
    });

    // user clicks column for the second time
    wrapper.find("th:last-child button").element.click();

    // renders rows in reverse order
    wrappers.forEach((row, i) => {
      expect(row.find("td:last-child").text()).toBe(reverseSortedAmounts[i]);
    });
  });

  it("should sort rows alphabetically if a compare function is not provided", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(DataTable, { propsData: { defs, rows } });
    let [, ...wrappers] = wrapper.findAll("tr").wrappers;

    let [, ...names] = (csv as string[][]).map((row: string[]) => row[1]);
    let sortedNames = names.slice().sort((a, b) => a.localeCompare(b));

    // user clicks name column
    wrapper.find("th:nth-child(2) button").element.click();

    // renders rows ordered by name alphabetically
    wrappers.forEach((row, i) => {
      expect(row.find("td:nth-child(2)").text()).toBe(sortedNames[i]);
    });
  });

  it("should transform data given a transform function", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name", transform: (name: string) => `${name}!!` },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
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
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
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
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    wrapper.setData({ search: "foo" });

    setTimeout(() => {
      expect(wrapper.find("input").text()).toBe("foo");
    });
  });

  it("should provide a filter", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    wrapper.setData({ filter: "Name" });

    setTimeout(() => {
      expect(wrapper.find("select").text()).toBe("Name");
    });
  });

  it("should provide a filter", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    wrapper.setData({ filter: "Name" });

    setTimeout(() => {
      expect(wrapper.find("select").text()).toBe("Name");
    });
  });

  it("should set filter to first def field if no defaultField is Provided", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows } });

    expect(wrapper.vm.$data.filter).toBe("ID");
  });

  it("should set filter to defaultField", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let wrapper = shallowMount(WithSearch, { propsData: { defs, rows, defaultFilter: "Name" } });

    expect(wrapper.vm.$data.filter).toBe("Name");
  });

  it("should pass table props throw slot scope", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let TableWithWrapper = Vue.extend({
      render(createElement) {
        return createElement(WithSearch, {
          props: { defs, rows, defaultFilter: "Name" },
          scopedSlots: {
            default: (props: any) => createElement(DataTable, { props })
          }
        });
      }
    });

    expect(() => mount(TableWithWrapper)).not.toThrow();
  });

  it("should filter data", () => {
    let defs: Def[] = [
      { field: "ID" },
      { field: "Name" },
      { field: "Description" },
      { field: "Date" },
      { field: "Amount" }
    ];

    let TableWithWrapper = Vue.extend({
      render(createElement) {
        return createElement(WithSearch, {
          props: { defs, rows, defaultFilter: "Name" },
          scopedSlots: {
            default: (props: any) => createElement(DataTable, { props })
          }
        });
      }
    });

    let wrapper = mount(TableWithWrapper);

    let input = wrapper.find("input");
    // user sets search text to kyra (first data row on payment-data.json)
    // @ts-ignore
    input.element.value = "kyra";
    input.trigger("input");

    let [, ...dataRows] = wrapper.findAll("tr").wrappers;

    expect(dataRows.length).toBe(1);
  });
});
