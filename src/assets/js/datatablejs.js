function startDataTablejs() {
    $(document).ready(function() {
        $('#table_id').DataTable();
        $('#myTable').dataTable({
            //ajax: '/',
            scrollY: 200,
            deferRender: true,
            scroller: true
        });
    });
}