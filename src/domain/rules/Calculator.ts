export default class Calculator {
	public static calculateOrderTotalPrice(values: number[]): number {
		let total = 10; //mocked
		for (const value of values!) {
			total += value;
		}
		return total;
	}
}