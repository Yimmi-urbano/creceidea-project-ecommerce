import React, { useEffect, useState } from 'react';

const withPermission = (WrappedComponent: React.ComponentType, componentName: string) => {
	const ComponentwithPermission: React.FC = (props) => {
		const [isAllowed, setIsAllowed] = useState<boolean>(false);

		useEffect(() => {
			const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
			const componentPermission = permissions.find(
				(comp: any) => comp.name_component === componentName
			);

			if (componentPermission?.status) {
				setIsAllowed(true);
			} else {
				setIsAllowed(false);
			}
		}, [componentName]);

		if (!isAllowed) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};

	return ComponentwithPermission;
};

export default withPermission;
