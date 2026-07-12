export function shortName(name: string): string {
	return name
		.replace("Tópicos em ", "Tóp. ")
		.replace("Computação", "Comp.")
		.replace("Computadores", "Comp.")
		.replace("Engenharia de Software", "Eng. Software")
		.replace("Sistemas Computacionais", "Sist. Comput.");
}
