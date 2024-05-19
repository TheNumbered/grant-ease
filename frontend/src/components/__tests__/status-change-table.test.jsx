import { render, screen } from '@testing-library/react';
import { StatusChangeTable } from '../status-change-table';

describe('StatusChangeTable', () => {
    const title = 'Test Table';
    const data = [
        { id: 1, name: 'John Doe', status: 'Pending' },
        { id: 2, name: 'Jane Smith', status: 'Approved' },
        { id: 3, name: 'Bob Johnson', status: 'Rejected' },
    ];
    const headers = ['name', 'status'];
    const handleStatusChange = vi.fn();

    test('renders table with correct title', () => {
        render(
            <StatusChangeTable
                title={title}
                data={data}
                headers={headers}
                handleStatusChange={handleStatusChange}
            />
        );

        const tableTitle = screen.getByText(title);
        expect(tableTitle).toBeInTheDocument();
    });
    /*
    test('renders table rows with correct data', () => {
        render(
            <StatusChangeTable
                title={title}
                data={data}
                headers={headers}
                handleStatusChange={handleStatusChange}
            />
        );

        const tableRows = screen.getAllByRole("rowgroup");
        expect(tableRows).toHaveLength(data.length + 1); // +1 for table header row

        data.forEach((row) => {
            const rowData = Object.values(row);
            rowData.forEach((value) => {
                const cell = screen.getByText(value);
                expect(cell).toBeInTheDocument();
            });
        });
    });
    /*
    test('selects and deselects rows when clicked', () => {
        render(
            <StatusChangeTable
                title={title}
                data={data}
                headers={headers}
                handleStatusChange={handleStatusChange}
            />
        );

        const checkboxes = screen.getAllByRole('checkbox');
        const firstCheckbox = checkboxes[1]; // Skip the "select all" checkbox

        fireEvent.click(firstCheckbox);
        expect(firstCheckbox.checked).toBe(true);

        fireEvent.click(firstCheckbox);
        expect(firstCheckbox.checked).toBe(false);
    });

    test('calls handleStatusChange with selected rows when approve button is clicked', () => {
        render(
            <StatusChangeTable
                title={title}
                data={data}
                headers={headers}
                handleStatusChange={handleStatusChange}
            />
        );

        const approveButton = screen.getByRole('button', { name: 'Approve' });
        fireEvent.click(approveButton);

        expect(handleStatusChange).toHaveBeenCalledWith([2], 'approve');
    });

    test('calls handleStatusChange with selected rows when reject button is clicked', () => {
        render(
            <StatusChangeTable
                title={title}
                data={data}
                headers={headers}
                handleStatusChange={handleStatusChange}
            />
        );

        const rejectButton = screen.getByRole('button', { name: 'Reject' });
        fireEvent.click(rejectButton);

        expect(handleStatusChange).toHaveBeenCalledWith([2], 'reject');
    });
    */
});