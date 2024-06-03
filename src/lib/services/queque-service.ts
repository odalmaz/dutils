export const queueService = (concurrency = 2, timeWindow = 1000) => {
	let activeRequests = 0;
	let lastRequestTime = Date.now();
	const requestQueue: (() => Promise<void>)[] = [];
	const activeTasks = new Set<string>();

	const processQueue = async () => {
		if (activeRequests >= concurrency) return;
		const task = requestQueue.shift();
		if (!task) return;

		activeRequests++;
		lastRequestTime = Date.now();

		try {
			await task();
		} catch (error) {
			console.error('Error processing task:', error);
		}
		activeRequests--;

		// Check if there are more tasks to process
		if (Date.now() - lastRequestTime < timeWindow) {
			setTimeout(processQueue, timeWindow - (Date.now() - lastRequestTime));
		} else {
			processQueue();
		}
	};

	return {
		add: (task: () => Promise<void>, taskId: string | number) => {
			taskId = String(taskId);
			if (activeTasks.has(taskId)) return;
			activeTasks.add(taskId);
			requestQueue.push(async () => {
				await task();
				activeTasks.delete(taskId);
			});
			processQueue();
		}
	};
};
